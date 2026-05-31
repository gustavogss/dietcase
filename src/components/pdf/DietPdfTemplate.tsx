import type { UserProfile, WeeklyMenu, Recommendation } from '@/types';

interface DietPdfTemplateProps {
  profile: UserProfile;
  menu: WeeklyMenu;
  recommendations: Recommendation[];
}

export function DietPdfTemplate({ profile, menu, recommendations }: DietPdfTemplateProps) {
  const currentDate = new Date().toLocaleDateString('pt-BR');
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;
  const dayLabels = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

  return (
    <div
      style={{
        fontFamily: 'Inter, Arial, sans-serif',
        maxWidth: '210mm',
        margin: '0 auto',
        padding: '20mm',
        backgroundColor: 'white',
        color: '#1e293b',
      }}
    >
      {/* Header */}
      <div style={{ borderBottom: '3px solid #006D77', paddingBottom: '20px', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '15px' }}>
        <img src="/logo.png" alt="DietCase" style={{ width: '50px', height: '50px' }} />
        <div>
          <h1 style={{ color: '#006D77', fontSize: '32px', margin: 0 }}>DietCase</h1>
          <p style={{ color: '#64748b', fontSize: '14px', margin: '5px 0 0 0' }}>
            Seu plano alimentar personalizado
          </p>
        </div>
      </div>

      {/* Informações do Usuário */}
      <div style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
        <h2 style={{ color: '#006D77', fontSize: '20px', marginTop: 0 }}>Informações do Paciente</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <strong>Nome:</strong> {profile.name}
          </div>
          <div>
            <strong>Plano:</strong> {profile.plan}
          </div>
          <div>
            <strong>IMC:</strong> {profile.imc.toFixed(1)}
          </div>
          <div>
            <strong>Peso:</strong> {profile.weight}kg
          </div>
          <div>
            <strong>Data:</strong> {currentDate}
          </div>
        </div>
      </div>

      {/* Cardápio Semanal */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#006D77', fontSize: '24px', marginBottom: '20px' }}>
          Cardápio Semanal - {menu.name}
        </h2>

        {days.map((day, index) => {
          const dayMenu = menu[day];
          return (
            <div
              key={day}
              style={{
                marginBottom: '25px',
                padding: '15px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                pageBreakInside: 'avoid',
              }}
            >
              <h3 style={{ color: '#f97316', fontSize: '18px', marginTop: 0 }}>
                {dayLabels[index]}
              </h3>

              <div style={{ marginBottom: '10px' }}>
                <strong style={{ color: '#64748b' }}>Café da Manhã:</strong> {dayMenu.breakfast.name}
                <br />
                <span style={{ fontSize: '14px', color: '#64748b' }}>
                  {dayMenu.breakfast.calories} kcal
                </span>
              </div>

              <div style={{ marginBottom: '10px' }}>
                <strong style={{ color: '#64748b' }}>Lanche da Manhã:</strong> {dayMenu.morningSnack.name}
                <br />
                <span style={{ fontSize: '14px', color: '#64748b' }}>
                  {dayMenu.morningSnack.calories} kcal
                </span>
              </div>

              <div style={{ marginBottom: '10px' }}>
                <strong style={{ color: '#64748b' }}>Almoço:</strong> {dayMenu.lunch.name}
                <br />
                <span style={{ fontSize: '14px', color: '#64748b' }}>
                  {dayMenu.lunch.calories} kcal
                </span>
              </div>

              <div style={{ marginBottom: '10px' }}>
                <strong style={{ color: '#64748b' }}>Lanche da Tarde:</strong> {dayMenu.afternoonSnack.name}
                <br />
                <span style={{ fontSize: '14px', color: '#64748b' }}>
                  {dayMenu.afternoonSnack.calories} kcal
                </span>
              </div>

              <div>
                <strong style={{ color: '#64748b' }}>Jantar:</strong> {dayMenu.dinner.name}
                <br />
                <span style={{ fontSize: '14px', color: '#64748b' }}>
                  {dayMenu.dinner.calories} kcal
                </span>
              </div>

              <div style={{ marginTop: '10px' }}>
                <strong style={{ color: '#64748b' }}>Ceia:</strong> {dayMenu.supper.name}
                <br />
                <span style={{ fontSize: '14px', color: '#64748b' }}>
                  {dayMenu.supper.calories} kcal
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recomendações */}
      <div style={{ marginBottom: '30px', pageBreakBefore: 'always' }}>
        <h2 style={{ color: '#006D77', fontSize: '24px', marginBottom: '20px' }}>
          Recomendações Gerais
        </h2>
        <ul style={{ lineHeight: '1.8' }}>
          {recommendations.slice(0, 5).map((rec) => (
            <li key={rec.id} style={{ marginBottom: '10px' }}>
              <strong>{rec.title}:</strong> {rec.description}
            </li>
          ))}
        </ul>
      </div>

      {/* Observações */}
      <div
        style={{
          padding: '20px',
          backgroundColor: '#fef3c7',
          borderLeft: '4px solid #f59e0b',
          marginBottom: '30px',
        }}
      >
        <h3 style={{ marginTop: 0, color: '#92400e' }}>⚠️ Observações Importantes</h3>
        <ul style={{ margin: 0, paddingLeft: '20px', color: '#78350f' }}>
          <li>Este plano alimentar é uma sugestão personalizada</li>
          <li>Consulte um nutricionista para ajustes específicos</li>
          <li>Mantenha-se hidratado bebendo pelo menos 2L de água por dia</li>
          <li>Ajuste as porções de acordo com sua necessidade calórica</li>
        </ul>
      </div>

      {/* Rodapé */}
      <div
        style={{
          borderTop: '2px solid #e2e8f0',
          paddingTop: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#64748b',
          fontSize: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img src="/logo.png" alt="DietCase" style={{ width: '35px', height: '35px' }} />
          <div>
            <p style={{ margin: 0, fontWeight: 'bold', color: '#006D77' }}>DietCase</p>
            <p style={{ margin: 0 }}>Dietas Personalizadas</p>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <p style={{ margin: 0 }}>© 2026 - Todos os direitos reservados</p>
          <p style={{ margin: '5px 0 0 0' }}>www.dietcase.com.br</p>
        </div>
      </div>
    </div>
  );
}