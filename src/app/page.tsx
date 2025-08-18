export default function Home() {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">daisyUI x Next.js</h1>

      <button className="btn btn-primary">Primary</button>

      <div className="card bg-base-200 shadow">
        <div className="card-body">
          <h2 className="card-title">Card title</h2>
          <p>Ready to go.</p>
          <div className="card-actions justify-end">
            <button className="btn btn-outline">Action</button>
          </div>
        </div>
      </div>
    </main>
  );
}
