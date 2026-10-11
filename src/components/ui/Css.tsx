/**
 * Component-scoped CSS, hoisted and de-duplicated by React 19 (`href` + `precedence`).
 * Everything goes into @layer components so Tailwind utilities always win.
 * The layer order is re-declared first so it holds no matter which stylesheet loads first.
 */
export function Css({ id, children }: { id: string; children: string }) {
  return (
    <style href={`css-${id}`} precedence="medium">
      {`@layer theme, base, components, utilities;\n@layer components {${children}}`}
    </style>
  );
}
