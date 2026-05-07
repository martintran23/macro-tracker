function Card({ title, children, className = "" }) {
  return (
    <section className={`card${className ? ` ${className}` : ""}`}>
      {title && <h3 className="card-title">{title}</h3>}
      <div className="card-content">{children}</div>
    </section>
  );
}

export default Card;
