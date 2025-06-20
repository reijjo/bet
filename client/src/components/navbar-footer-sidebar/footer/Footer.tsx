import "./Footer.css";

export const Footer = () => {
  const copyright = String.fromCodePoint(169);
  return (
    <footer>
      <div className="wrapper">
        <p>{copyright} 2024 Reijjo</p>
      </div>
    </footer>
  );
};
