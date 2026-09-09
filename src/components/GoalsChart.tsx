import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { Goal } from '@/types';

interface GoalsChartProps {
  goals: Goal[];
}

export function GoalsChart({ goals }: GoalsChartProps) {
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
    to: new Date(),
  });

  if (!goals) return null;

  // Filtrar metas pelo período selecionado
  const filteredGoals = goals.filter((goal) => {
    const goalDate = new Date(goal.createdAt);
    if (!dateRange.from || !dateRange.to) return true;
    return goalDate >= dateRange.from && goalDate <= dateRange.to;
  });

  const completedCount = filteredGoals.filter((g) => g.completed).length;
  const pendingCount = filteredGoals.length - completedCount;
  const completionRate = filteredGoals.length > 0
    ? ((completedCount / filteredGoals.length) * 100).toFixed(0)
    : '0';

  const data = [
    { name: 'Concluídas', value: completedCount, color: '#10b981' },
    { name: 'Pendentes', value: pendingCount, color: '#f59e0b' },
  ];

  return (
    <Card className="border-none shadow-sm overflow-hidden">
      <CardHeader className="p-8 pb-4 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold tracking-tight">Progresso de Metas</CardTitle>
            <CardDescription className="text-base font-medium">
              Acompanhe suas metas cumpridas no período
            </CardDescription>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'h-12 px-5 justify-start text-left font-bold text-base rounded-xl shadow-sm hover:shadow-md transition-all',
                  !dateRange && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-3 h-5 w-5 text-primary" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <span className="whitespace-nowrap">
                      {format(dateRange.from, 'dd/MM/yy')} -{' '}
                      {format(dateRange.to, 'dd/MM/yy')}
                    </span>
                  ) : (
                    format(dateRange.from, 'dd/MM/yyyy')
                  )
                ) : (
                  <span>Selecionar período</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="range"
                selected={{
                  from: dateRange.from,
                  to: dateRange.to,
                }}
                onSelect={(range) => {
                  setDateRange({
                    from: range?.from,
                    to: range?.to,
                  });
                }}
                numberOfMonths={2}
                initialFocus
                className={cn('p-3 pointer-events-auto')}
              />
            </PopoverContent>
          </Popover>
        </div>
      </CardHeader>
      <CardContent>
        {filteredGoals.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            Nenhuma meta encontrada neste período
          </div>
        ) : (
          <div className="space-y-8">
            {/* Estatísticas */}
            <div className="grid grid-cols-3 gap-4 text-center px-4">
              <div className="space-y-1">
                <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Concluídas</p>
                <p className="text-3xl font-black text-foreground tracking-tighter">{completedCount}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Pendentes</p>
                <p className="text-3xl font-black text-foreground tracking-tighter">{pendingCount}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Taxa</p>
                <p className="text-3xl font-black text-primary tracking-tighter">{completionRate}%</p>
              </div>
            </div>

            {/* Gráfico de Pizza */}
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>

            {/* Lista de metas */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Metas neste período:</p>
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {filteredGoals.map((goal) => (
                  <div
                    key={goal.id}
                    className="flex items-center gap-2 text-xs p-2 rounded bg-muted/50"
                  >
                    <div
                      className={cn(
                        'w-2 h-2 rounded-full shrink-0',
                        goal.completed ? 'bg-primary' : 'bg-muted-foreground'
                      )}
                    />
                    <span className="flex-1 truncate">{goal.title}</span>
                    {goal.completed && (
                      <span className="font-medium">✓</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}