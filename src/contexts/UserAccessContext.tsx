import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
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
  getPlanDisplayInfo,
} from "@/lib/permissions";
import { persistUserProfile, readStoredUserProfile } from "@/lib/security";

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
  hasPermission: (feature: FeatureType) => boolean;
}

const UserAccessContext = createContext<UserAccessContextType | null>(null);

function safeReadProfile(): UserProfile | null {
  return readStoredUserProfile<UserProfile>();
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

function convertFirebaseUserToProfile(
  firebaseUser: FirebaseUser,
  uid: string,
): UserProfile {
  return {
    id: uid,
    name: firebaseUser.name || "Usuário",
    email: firebaseUser.email || "",
    plan: firebaseUser.plan || "TRIAL",
    trialStartDate: firebaseUser.trialStartDate,
    trialExpiresAt: firebaseUser.trialExpiresAt,
    createdAt: firebaseUser.createdAt || new Date().toISOString(),
    age: firebaseUser.age ?? 0,
    weight: firebaseUser.weight ?? 0,
    height: firebaseUser.height ?? 0,
    imc: firebaseUser.imc ?? 0,
    morbidities: firebaseUser.morbidities ?? [],
    exercises: firebaseUser.exercises ?? false,
    exerciseType: firebaseUser.exerciseType,
    exerciseFrequency: firebaseUser.exerciseFrequency,
    foodGoal: firebaseUser.foodGoal,
    dietaryPreferences: firebaseUser.dietaryPreferences ?? [],
    restrictions: firebaseUser.restrictions ?? [],
    dislikedFoods: firebaseUser.dislikedFoods ?? [],
    favoriteFoods: firebaseUser.favoriteFoods ?? [],
    activityLevel: firebaseUser.activityLevel,
    mealsPerDay: firebaseUser.mealsPerDay,
    mealSchedule: firebaseUser.mealSchedule,
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
    photoURL: null,
  });

  useEffect(() => {
    const onLocalProfileUpdated = () => {
      if (!auth.currentUser) {
        setLocalProfile(safeReadProfile());
        return;
      }

      void userService.getUser(auth.currentUser.uid).then((firebaseUser) => {
        if (!firebaseUser) return;
        const profile = convertFirebaseUserToProfile(
          firebaseUser,
          auth.currentUser?.uid ?? "",
        );
        setLocalProfile(profile);
        persistUserProfile(profile);
      });
    };
    window.addEventListener("dietcase-profile-updated", onLocalProfileUpdated);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);
        setSessionData({
          uid: user.uid,
          email: user.email,
          photoURL: user.photoURL,
        });

        // Otimização: Libera o carregamento imediatamente para o Dashboard renderizar
        // com dados locais/cache enquanto buscamos o perfil completo no Firestore em background
        setIsLoading(false);

        try {
          const firebaseUser = await userService.getUser(user.uid);
          if (firebaseUser) {
            const profile = convertFirebaseUserToProfile(
              firebaseUser,
              user.uid,
            );
            setLocalProfile(profile);
            persistUserProfile(profile);
          } else {
            await userService.createUserWithTrial({
              name: user.displayName || user.email?.split("@")[0] || "Usuário",
              email: user.email || "",
            });

            const newFirebaseUser = await userService.getUser(user.uid);
            if (newFirebaseUser) {
              const profile = convertFirebaseUserToProfile(
                newFirebaseUser,
                user.uid,
              );
              setLocalProfile(profile);
              persistUserProfile(profile);
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
      window.removeEventListener(
        "dietcase-profile-updated",
        onLocalProfileUpdated,
      );
      unsubscribe();
    };
  }, []);

  const value = useMemo<UserAccessContextType>(() => {
    const base = mockUsers[0];

    if (!isAuthenticated) {
      const now = new Date();
      const trialExpires = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

      const profile = buildDefaultProfile(base, {
        plan: "TRIAL",
        trialStartDate: now.toISOString(),
        trialExpiresAt: trialExpires.toISOString(),
      });

      return {
        accessLevel: "VISITOR",
        isAuthenticated: false,
        isLoading,
        profile,
        effectivePlan: profile.plan,
        isTrialExpired: isTrialExpired(profile.trialExpiresAt),
        trialDaysRemaining: getTrialDaysRemaining(profile.trialExpiresAt),
        planDisplayInfo: getPlanDisplayInfo(
          profile.plan,
          profile.trialExpiresAt,
        ),
        hasPermission: (feature) => hasPermission(profile.plan, feature),
      };
    }

    const effectivePlan: PlanType = localProfile?.plan || "TRIAL";
    const authenticatedProfile = localProfile ?? {
      id: sessionData.uid ?? "",
      name: sessionData.email?.split("@")[0] || "Usuário",
      email: sessionData.email ?? "",
      age: 0,
      weight: 0,
      height: 0,
      imc: 0,
      plan: effectivePlan,
      morbidities: [],
      createdAt: new Date().toISOString(),
      exercises: false,
    };
    const profile = buildDefaultProfile(authenticatedProfile, {
      id: sessionData.uid ?? localProfile?.id ?? "",
      email: sessionData.email ?? localProfile?.email ?? "",
      name: localProfile?.name || sessionData.email?.split("@")[0] || "Usuário",
      plan: effectivePlan,
      avatarUrl: localProfile?.avatarUrl ?? sessionData.photoURL,
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
      hasPermission: (feature) => hasPermission(profile.plan, feature),
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
    throw new Error(
      "useUserAccessContext must be used within a UserAccessProvider",
    );
  }
  return context;
}
