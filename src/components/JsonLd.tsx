/**
 * Renders a schema.org graph as JSON-LD.
 *
 * Server component, so the markup is in the HTML Google is served rather than
 * being written in by the browser. The `<` escape is the standard guard
 * against a stray closing tag inside the data terminating the script early.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // The content is built in this repo from typed data, never from user
      // input, and JSON.stringify cannot emit markup once `<` is escaped.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
