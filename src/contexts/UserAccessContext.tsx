import { 
  createContext, 
  useContext, 
  useEffect, 
  useMemo, 
  useState, 
  ReactNode 
} from "react";
import type { PlanType, UserProfile, FirebaseUser } from "@/types";
import { mockUsers } from "@/data/mocks";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { userService } from "@/services/userService";
import { 
  hasPermission, 
  isTrialExpired, 
  getTrialDaysRemaining,
  getPlanDisplayInfo 
} from "@/lib/permissions";

export type AccessLevel = "VISITOR" | "USER";

export interface UserAccessContextType {
	accessLevel: AccessLevel;
	isAuthenticated: boolean;
	isLoading: boolean;
	profile: UserProfile;
	effectivePlan: PlanType;
	isTrialExpired: boolean;
	trialDaysRemaining: number;
	planDisplayInfo: ReturnType<typeof getPlanDisplayInfo>;
	hasPermission: (feature: any) => boolean;
}

const UserAccessContext = createContext<UserAccessContextType | null>(null);

function safeReadProfile(): UserProfile | null {
	const raw = localStorage.getItem("dietcase-user-profile");
	if (!raw) return null;
	try {
		return JSON.parse(raw) as UserProfile;
	} catch {
		return null;
	}
}

function buildDefaultProfile(
	base: UserProfile,
	overrides: Partial<UserProfile>,
): UserProfile {
	return {
		...base,
		...overrides,
		id: overrides.id ?? base.id,
		name: overrides.name ?? base.name,
		email: overrides.email ?? base.email,
		age: overrides.age ?? base.age,
		weight: overrides.weight ?? base.weight,
		height: overrides.height ?? base.height,
		imc: overrides.imc ?? base.imc,
		plan: overrides.plan ?? base.plan,
		morbidities: overrides.morbidities ?? base.morbidities,
		createdAt: overrides.createdAt ?? base.createdAt,
	};
}

function convertFirebaseUserToProfile(firebaseUser: FirebaseUser, uid: string): UserProfile {
	const base = mockUsers[0];
	return {
		...base,
		id: uid,
		name: firebaseUser.name,
		email: firebaseUser.email,
		plan: firebaseUser.plan,
		trialStartDate: firebaseUser.trialStartDate,
		trialExpiresAt: firebaseUser.trialExpiresAt,
		createdAt: firebaseUser.createdAt,
		age: base.age,
		weight: base.weight,
		height: base.height,
		imc: base.imc,
		morbidities: base.morbidities,
		exercises: base.exercises,
		exerciseType: base.exerciseType,
		exerciseFrequency: base.exerciseFrequency,
	};
}

export function UserAccessProvider({ children }: { children: ReactNode }) {
	const [localProfile, setLocalProfile] = useState<UserProfile | null>(() =>
		safeReadProfile(),
	);

	const [isLoading, setIsLoading] = useState(() => !localProfile);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [sessionData, setSessionData] = useState<{
		uid: string | null;
		email: string | null;
		photoURL: string | null;
	}>({
		uid: null,
		email: null,
		photoURL: null
	});

	useEffect(() => {
		const onLocalProfileUpdated = () => setLocalProfile(safeReadProfile());
		window.addEventListener("dietcase-profile-updated", onLocalProfileUpdated);

		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				setIsAuthenticated(true);
				setSessionData({
					uid: user.uid,
					email: user.email,
					photoURL: user.photoURL
				});
				
				// Otimização: Libera o carregamento imediatamente para o Dashboard renderizar
				// com dados locais/cache enquanto buscamos o perfil completo no Firestore em background
				setIsLoading(false);

				try {
					const firebaseUser = await userService.getUser(user.uid);
					if (firebaseUser) {
						const profile = convertFirebaseUserToProfile(firebaseUser, user.uid);
						setLocalProfile(profile);
						localStorage.setItem("dietcase-user-profile", JSON.stringify(profile));
					} else {
						await userService.createUserWithTrial({
							name: user.displayName || user.email?.split("@")[0] || "Usuário",
							email: user.email || ""
						});
						
						const newFirebaseUser = await userService.getUser(user.uid);
						if (newFirebaseUser) {
							const profile = convertFirebaseUserToProfile(newFirebaseUser, user.uid);
							setLocalProfile(profile);
							localStorage.setItem("dietcase-user-profile", JSON.stringify(profile));
						}
					}
				} catch (error) {
					console.error("Error fetching/creating Firestore profile:", error);
				}
			} else {
				setIsAuthenticated(false);
				setSessionData({ uid: null, email: null, photoURL: null });
				setIsLoading(false);
			}
		});

		return () => {
			window.removeEventListener("dietcase-profile-updated", onLocalProfileUpdated);
			unsubscribe();
		};
	}, []);

	const value = useMemo<UserAccessContextType>(() => {
		const base = mockUsers[0];

		if (!isAuthenticated) {
			const now = new Date();
			const trialExpires = new Date(now.getTime() + (7 * 24 * 60 * 60 * 1000));
			
			const profile = buildDefaultProfile(base, { 
				plan: "TRIAL",
				trialStartDate: now.toISOString(),
				trialExpiresAt: trialExpires.toISOString()
			});

			return {
				accessLevel: "VISITOR",
				isAuthenticated: false,
				isLoading,
				profile,
				effectivePlan: profile.plan,
				isTrialExpired: isTrialExpired(profile.trialExpiresAt),
				trialDaysRemaining: getTrialDaysRemaining(profile.trialExpiresAt),
				planDisplayInfo: getPlanDisplayInfo(profile.plan, profile.trialExpiresAt),
				hasPermission: (feature) => hasPermission(profile.plan, feature)
			};
		}

		const effectivePlan: PlanType = localProfile?.plan || "TRIAL";
		const profile = buildDefaultProfile(localProfile ?? base, {
			id: sessionData.uid ?? localProfile?.id ?? base.id,
			email: sessionData.email ?? localProfile?.email ?? base.email,
			name: localProfile?.name || sessionData.email?.split("@")[0] || base.name,
			plan: effectivePlan,
			avatarUrl: localProfile?.avatarUrl ?? sessionData.photoURL ?? base.avatarUrl,
		});

		return {
			accessLevel: "USER",
			isAuthenticated: true,
			isLoading,
			profile,
			effectivePlan,
			isTrialExpired: isTrialExpired(profile.trialExpiresAt),
			trialDaysRemaining: getTrialDaysRemaining(profile.trialExpiresAt),
			planDisplayInfo: getPlanDisplayInfo(profile.plan, profile.trialExpiresAt),
			hasPermission: (feature) => hasPermission(profile.plan, feature)
		};
	}, [isAuthenticated, isLoading, localProfile, sessionData]);

	return (
		<UserAccessContext.Provider value={value}>
			{children}
		</UserAccessContext.Provider>
	);
}

export function useUserAccessContext() {
	const context = useContext(UserAccessContext);
	if (!context) {
		throw new Error("useUserAccessContext must be used within a UserAccessProvider");
	}
	return context;
}
