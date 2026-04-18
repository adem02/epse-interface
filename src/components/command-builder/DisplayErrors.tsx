export function DisplayErrors({
  formErrors
}: {
  formErrors: string[]
}) {
  return (
    <>
      <p
        className="font-mono font-semibold"
        style={{ fontSize: "10px", color: "#fca5a5", letterSpacing: "1px" }}
      >
        VALIDATION ERRORS
      </p>
      <ul className="space-y-1">
        {formErrors.map((error, index) => (
          <li
            key={`${error}-${index}`}
            className="font-mono"
            style={{ fontSize: "10px", color: "#fecaca" }}
          >
            - {error}
          </li>
        ))}
      </ul>
    </>
  )
}