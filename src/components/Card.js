function Card({ title, children }) {
  return (
    <section className="card">
      {title && <h3 className="card-title">{title}</h3>}
      <div className="card-content">{children}</div>
    </section>
  );
}

export default Card;
