export default function BoutiqueLoading() {
  return (
    <main className="section shop-page">
      <div className="shop-heading skeleton-heading">
        <div>
          <span className="skeleton-line short" />
          <span className="skeleton-line title" />
          <span className="skeleton-line" />
        </div>
      </div>
      <div className="shop-layout">
        <aside className="filter-panel skeleton-filter" aria-hidden="true">
          {Array.from({ length: 7 }).map((_, index) => (
            <span className="skeleton-line" key={index} />
          ))}
        </aside>
        <div className="product-grid" aria-label="Chargement du catalogue">
          {Array.from({ length: 10 }).map((_, index) => (
            <article className="product-card skeleton-card" key={index}>
              <span className="skeleton-media" />
              <div className="product-card-body">
                <span className="skeleton-line short" />
                <span className="skeleton-line" />
                <span className="skeleton-line short" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
