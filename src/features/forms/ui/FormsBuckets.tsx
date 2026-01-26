import { useMemo } from "react";
import type { Form } from "../model/forms.types";

export function useFormsBuckets(forms: Form[]) {
  return useMemo(() => {
    const published: Form[] = [];
    const drafts: Form[] = [];
    for (const f of forms) (f.isPublished ? published : drafts).push(f);
    return { published, drafts };
  }, [forms]);
}
