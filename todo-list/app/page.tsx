import TodoApp from "@/components/todo-app"

export default function Home() {
  return (
    <main className="min-h-screen bg-pastel-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <TodoApp />
      </div>
    </main>
  )
}

