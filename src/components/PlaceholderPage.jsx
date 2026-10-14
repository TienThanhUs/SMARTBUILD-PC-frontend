// Stand-in for screens that are routed but not built yet. Lists the
// backend endpoints the screen will call, taken from the API list.
export function PlaceholderPage({ title, description, apis = [] }) {
  return (
    <section className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        {description && <p className="mt-1 text-slate-600">{description}</p>}
      </div>
      <div className="card p-5">
        <p className="text-sm font-medium text-amber-700">Màn hình đang được xây dựng.</p>
        {apis.length > 0 && (
          <>
            <p className="mt-3 text-sm text-slate-600">API sẽ dùng:</p>
            <ul className="mt-2 space-y-1 font-mono text-xs text-slate-700">
              {apis.map((api) => (
                <li key={api}>{api}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  )
}
