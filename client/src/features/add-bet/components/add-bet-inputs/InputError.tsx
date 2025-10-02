export const hasInputError = (errors: string) => {
  const ulStyle = {
    padding: "0.5rem 0.75rem",
    listStylePosition: "inside" as const,
    color: "var(--error-dark)",
    backgroundColor: "var(--error-xxlight)",
    border: "1px solid var(--error-dark)",
    borderRadius: "8px",
    fontSize: "var(--font-xsmall)",
    fontWeight: "600",
    maxWidth: "max-content",
    marginTop: "0.5rem",
  };

  const liStyle = {
    listStyle: "none",
  };

  return (
    <ul style={ulStyle}>
      <li style={liStyle}>
        <p style={{ textWrap: "balance", textAlign: "center" }}>{errors}</p>
      </li>
    </ul>
  );
};
