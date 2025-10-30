import { useState, useMemo } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { ExerciseDatabase } from './components/exercise-database'
import type { Exercise } from './components/exercise-database'
import { WorkoutCreator } from './components/workout-creator'
import type { Workout } from './components/workout-creator'
import { WorkoutExecution } from './components/workout-execution'
import type { WorkoutProgress } from './components/workout-execution'
import { VolumeDashboard } from './components/volume-dashboard'
import { VolumeLimitsManager } from './components/volume-limits'
import type { VolumeLimits } from './components/volume-limits'
import { UserCheck, Dumbbell, TrendingUp, Settings, Target } from 'lucide-react'
import { Button } from './components/ui/button'

// Dados de exemplo para começar
const sampleExercises: Exercise[] = [
  {
    id: '1',
    name: 'Supino Reto',
    muscleGroups: [
      { muscleGroup: 'Peito', percentage: 60 },
      { muscleGroup: 'Tríceps', percentage: 25 },
      { muscleGroup: 'Ombros', percentage: 15 }
    ],
    notes: 'Foque em movimento controlado e amplitude completa de movimento'
  },
  {
    id: '2',
    name: 'Barra Fixa',
    muscleGroups: [
      { muscleGroup: 'Grande dorsal', percentage: 60 },
      { muscleGroup: 'Bíceps', percentage: 25 },
      { muscleGroup: 'Trapézio', percentage: 15 }
    ],
    notes: 'Estenda completamente na descida, queixo acima da barra na subida'
  },
  {
    id: '3',
    name: 'Agachamento',
    muscleGroups: [
      { muscleGroup: 'Quadríceps', percentage: 45 },
      { muscleGroup: 'Glúteos', percentage: 35 },
      { muscleGroup: 'Posterior da coxa', percentage: 15 },
      { muscleGroup: 'Panturrilhas', percentage: 5 }
    ],
    notes: 'Mantenha o peito erguido, joelhos alinhados com os pés'
  },
  {
    id: '4',
    name: 'Desenvolvimento Militar',
    muscleGroups: [
      { muscleGroup: 'Ombros', percentage: 60 },
      { muscleGroup: 'Tríceps', percentage: 25 },
      { muscleGroup: 'Trapézio', percentage: 15 }
    ],
    notes: 'Pressione para cima, mantenha o core contraído'
  },
  {
    id: '5',
    name: 'Remada Curvada',
    muscleGroups: [
      { muscleGroup: 'Grande dorsal', percentage: 50 },
      { muscleGroup: 'Trapézio', percentage: 30 },
      { muscleGroup: 'Bíceps', percentage: 20 }
    ],
    notes: 'Puxe até o peito, aperte as escápulas'
  },
  {
    id: '6',
    name: 'Crucifixo',
    muscleGroups: [
      { muscleGroup: 'Peito', percentage: 85 },
      { muscleGroup: 'Ombros', percentage: 15 }
    ],
    notes: 'Movimento controlado, foque na contração do peito'
  },
  {
    id: '7',
    name: 'Leg Press',
    muscleGroups: [
      { muscleGroup: 'Quadríceps', percentage: 50 },
      { muscleGroup: 'Glúteos', percentage: 30 },
      { muscleGroup: 'Posterior da coxa', percentage: 15 },
      { muscleGroup: 'Panturrilhas', percentage: 5 }
    ],
    notes: 'Mantenha os joelhos alinhados com os pés'
  },
  {
    id: '8',
    name: 'Rosca Direta',
    muscleGroups: [
      { muscleGroup: 'Bíceps', percentage: 90 },
      { muscleGroup: 'Antebraços', percentage: 10 }
    ],
    notes: 'Evite balançar o corpo, movimento controlado'
  },
  {
    id: '9',
    name: 'Tríceps Pulley',
    muscleGroups: [
      { muscleGroup: 'Tríceps', percentage: 90 },
      { muscleGroup: 'Ombros', percentage: 10 }
    ],
    notes: 'Mantenha os cotovelos fixos'
  },
  {
    id: '10',
    name: 'Elevação Lateral',
    muscleGroups: [
      { muscleGroup: 'Ombros', percentage: 90 },
      { muscleGroup: 'Trapézio', percentage: 10 }
    ],
    notes: 'Movimento controlado, não balance os halteres'
  }
]

const sampleWorkouts: Workout[] = [
  {
    id: 'w1',
    name: 'Força Membros Superiores',
    exercises: [
      { exerciseId: '1', sets: 4, reps: 8, weight: 80 },
      { exerciseId: '2', sets: 3, reps: 10, weight: 15 },
      { exerciseId: '4', sets: 3, reps: 10, weight: 40 },
      { exerciseId: '5', sets: 4, reps: 8, weight: 60 }
    ],
    createdAt: new Date('2024-01-15'),
    assignedTo: 'student'
  },
  {
    id: 'w2',
    name: 'Potência Membros Inferiores',
    exercises: [
      { exerciseId: '3', sets: 4, reps: 12, weight: 100 },
      { exerciseId: '7', sets: 3, reps: 8, weight: 200 }
    ],
    createdAt: new Date('2024-01-16'),
    assignedTo: 'student'
  }
]

export default function App() {
  const [exercises, setExercises] = useState<Exercise[]>(sampleExercises)
  const [workouts, setWorkouts] = useState<Workout[]>(sampleWorkouts)
  const [volumeLimits, setVolumeLimits] = useState<VolumeLimits>({
    'Peito': 8000,
    'Grande dorsal': 9000,
    'Trapézio': 6000,
    'Ombros': 7000,
    'Quadríceps': 10000,
    'Posterior da coxa': 6000,
    'Glúteos': 8000,
    'Panturrilhas': 4000,
    'Bíceps': 4000,
    'Tríceps': 5000,
    'Antebraços': 2000,
    'Core': 3000,
    'Lombar': 3000
  })
  const [studentVolumeLimits, setStudentVolumeLimits] = useState<VolumeLimits>({
    'Peito': 6000,
    'Grande dorsal': 7000,
    'Trapézio': 4000,
    'Ombros': 5000,
    'Quadríceps': 8000,
    'Posterior da coxa': 4000,
    'Glúteos': 6000,
    'Panturrilhas': 3000,
    'Bíceps': 3000,
    'Tríceps': 4000,
    'Antebraços': 1500,
    'Core': 2000,
    'Lombar': 2000
  })
  const [workoutProgress, setWorkoutProgress] = useState<WorkoutProgress[]>([
    {
      workoutId: 'w1',
      exerciseProgress: {
        '1': [true, true, false, false], // 2/4 sets completed
        '2': [true, true, true], // 3/3 sets completed  
        '4': [true, false, false], // 1/3 sets completed
        '5': [true, true, true, true] // 4/4 sets completed
      },
      exerciseNotes: {
        '1': 'Senti o peito bem trabalhado, peso está bom.',
        '2': 'Dificuldade nas últimas repetições, mas consegui completar.'
      }
    },
    {
      workoutId: 'w2',
      exerciseProgress: {
        '3': [true, true, true, true], // 4/4 sets completed (first exercise)
        '7': [true, true, true] // 3/3 sets completed (second exercise)
      },
      exerciseNotes: {
        '3': 'Pernas pesadas hoje, foi mais difícil que o normal.',
        '7': 'Consegui manter boa postura durante todo o exercício.'
      },
      completedAt: new Date('2024-01-17'),
      notes: 'Achei o agachamento mais difícil hoje, pernas pesadas.'
    }
  ])

  const handleAddExercise = (exercise: Omit<Exercise, 'id'>) => {
    const newExercise: Exercise = {
      ...exercise,
      id: Date.now().toString()
    }
    setExercises(prev => [...prev, newExercise])
  }

  const handleDeleteExercise = (id: string) => {
    setExercises(prev => prev.filter(ex => ex.id !== id))
  }

  const handleEditExercise = (id: string, exercise: Omit<Exercise, 'id'>) => {
    setExercises(prev =>
      prev.map(ex => ex.id === id ? { ...exercise, id } : ex)
    )
  }

  const handleCreateWorkout = (workout: Omit<Workout, 'id' | 'createdAt'>) => {
    const newWorkout: Workout = {
      ...workout,
      id: Date.now().toString(),
      createdAt: new Date()
    }
    setWorkouts(prev => [...prev, newWorkout])
  }

  const handleEditWorkout = (id: string, workout: Omit<Workout, 'id' | 'createdAt'>) => {
    setWorkouts(prev =>
      prev.map(w => w.id === id ? { ...workout, id, createdAt: w.createdAt } : w)
    )
  }

  const handleDeleteWorkout = (id: string) => {
    setWorkouts(prev => prev.filter(w => w.id !== id))
    // Remove progress for deleted workout
    setWorkoutProgress(prev => prev.filter(wp => wp.workoutId !== id))
  }

  const handleUpdateProgress = (workoutId: string, exerciseId: string, setIndex: number, completed: boolean) => {
    setWorkoutProgress(prev => {
      const existing = prev.find(wp => wp.workoutId === workoutId)

      if (existing) {
        return prev.map(wp => {
          if (wp.workoutId === workoutId) {
            const exerciseProgress = [...(wp.exerciseProgress[exerciseId] || [])]
            exerciseProgress[setIndex] = completed
            return {
              ...wp,
              exerciseProgress: {
                ...wp.exerciseProgress,
                [exerciseId]: exerciseProgress
              }
            }
          }
          return wp
        })
      } else {
        const newProgress: WorkoutProgress = {
          workoutId,
          exerciseProgress: {
            [exerciseId]: Array.from({ length: setIndex + 1 }, (_, i) => i === setIndex ? completed : false)
          }
        }
        return [...prev, newProgress]
      }
    })
  }

  const handleUpdateExerciseNotes = (workoutId: string, exerciseId: string, notes: string) => {
    setWorkoutProgress(prev => {
      const existing = prev.find(wp => wp.workoutId === workoutId)

      if (existing) {
        return prev.map(wp => {
          if (wp.workoutId === workoutId) {
            return {
              ...wp,
              exerciseNotes: {
                ...wp.exerciseNotes,
                [exerciseId]: notes
              }
            }
          }
          return wp
        })
      } else {
        const newProgress: WorkoutProgress = {
          workoutId,
          exerciseProgress: {},
          exerciseNotes: {
            [exerciseId]: notes
          }
        }
        return [...prev, newProgress]
      }
    })
  }

  const handleCompleteWorkout = (workoutId: string, notes?: string) => {
    setWorkoutProgress(prev =>
      prev.map(wp =>
        wp.workoutId === workoutId
          ? { ...wp, completedAt: new Date(), notes }
          : wp
      )
    )
  }

  const handleResetWorkout = (workoutId: string) => {
    setWorkoutProgress(prev =>
      prev.map(wp =>
        wp.workoutId === workoutId
          ? { ...wp, completedAt: undefined }
          : wp
      )
    )
  }

  // Calculate current weekly volume with muscle group percentages
  const currentWeeklyVolume = useMemo(() => {
    const now = new Date()
    const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)

    const volumeMap: { [muscleGroup: string]: number } = {}

    // Initialize with all muscle groups from exercises
    const allMuscleGroups = new Set<string>()
    exercises.forEach(ex => {
      if (ex.muscleGroups) {
        ex.muscleGroups.forEach(mg => allMuscleGroups.add(mg.muscleGroup))
      } else if (ex.muscleGroup) {
        allMuscleGroups.add(ex.muscleGroup)
      }
    })

    allMuscleGroups.forEach(group => {
      volumeMap[group] = 0
    })

    workoutProgress
      .filter(progress => progress.completedAt && progress.completedAt >= weekStart)
      .forEach(progress => {
        const workout = workouts.find(w => w.id === progress.workoutId)
        if (!workout) return

        workout.exercises.forEach(workoutExercise => {
          const exercise = exercises.find(ex => ex.id === workoutExercise.exerciseId)
          if (!exercise) return

          const exerciseProgress = progress.exerciseProgress[workoutExercise.exerciseId] || []
          const completedSets = exerciseProgress.filter(Boolean).length
          const exerciseVolume = completedSets * workoutExercise.reps * (workoutExercise.weight || 0)

          if (exercise.muscleGroups) {
            // New format with multiple muscle groups and percentages
            exercise.muscleGroups.forEach(mg => {
              const volumeContribution = (exerciseVolume * mg.percentage) / 100
              volumeMap[mg.muscleGroup] = (volumeMap[mg.muscleGroup] || 0) + volumeContribution
            })
          } else if (exercise.muscleGroup) {
            // Legacy format for backward compatibility
            volumeMap[exercise.muscleGroup] = (volumeMap[exercise.muscleGroup] || 0) + exerciseVolume
          }
        })
      })

    return volumeMap
  }, [exercises, workouts, workoutProgress])

  // Get unique muscle groups
  const muscleGroups = useMemo(() => {
    const allMuscleGroups = new Set<string>()
    exercises.forEach(ex => {
      if (ex.muscleGroups) {
        ex.muscleGroups.forEach(mg => allMuscleGroups.add(mg.muscleGroup))
      } else if (ex.muscleGroup) {
        allMuscleGroups.add(ex.muscleGroup)
      }
    })
    return Array.from(allMuscleGroups).sort()
  }, [exercises])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Controle de Treinos</h1>
          <p className="text-muted-foreground">
            Acompanhe exercícios, gerencie treinos e monitore o volume de treinamento
          </p>
        </div>

        <Tabs defaultValue="student" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="student" className="flex items-center gap-2">
              <UserCheck className="w-4 h-4" />
              <span className="hidden sm:inline">Aluno</span>
            </TabsTrigger>
            <TabsTrigger value="trainer" className="flex items-center gap-2">
              <Dumbbell className="w-4 h-4" />
              <span className="hidden sm:inline">Treinador</span>
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Painel</span>
            </TabsTrigger>
            <TabsTrigger value="limits" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Limites</span>
            </TabsTrigger>
            <TabsTrigger value="exercises" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Exercícios</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="student" className="mt-6">
            <WorkoutExecution
              exercises={exercises}
              workouts={workouts}
              workoutProgress={workoutProgress}
              onUpdateProgress={handleUpdateProgress}
              onUpdateExerciseNotes={handleUpdateExerciseNotes}
              onCompleteWorkout={handleCompleteWorkout}
              onResetWorkout={handleResetWorkout}
            />
          </TabsContent>

          <TabsContent value="trainer" className="mt-6">
            <WorkoutCreator
              exercises={exercises}
              workouts={workouts}
              onCreateWorkout={handleCreateWorkout}
              onEditWorkout={handleEditWorkout}
              onDeleteWorkout={handleDeleteWorkout}
              volumeLimits={volumeLimits}
              currentWeeklyVolume={currentWeeklyVolume}
            />
          </TabsContent>

          <TabsContent value="dashboard" className="mt-6">
            <VolumeDashboard
              exercises={exercises}
              workouts={workouts}
              workoutProgress={workoutProgress}
              volumeLimits={volumeLimits}
              studentVolumeLimits={studentVolumeLimits}
              onUpdateStudentLimits={setStudentVolumeLimits}
            />
          </TabsContent>

          <TabsContent value="limits" className="mt-6">
            <VolumeLimitsManager
              volumeLimits={volumeLimits}
              currentWeeklyVolume={currentWeeklyVolume}
              muscleGroups={muscleGroups}
              onUpdateLimits={setVolumeLimits}
            />
          </TabsContent>

          <TabsContent value="exercises" className="mt-6">
            <ExerciseDatabase
              exercises={exercises}
              onAddExercise={handleAddExercise}
              onDeleteExercise={handleDeleteExercise}
              onEditExercise={handleEditExercise}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}