
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";

type Props = {
  formTitle?: string;
  busy?: boolean;
  onStart: () => void;
};

export function SubmissionStartCard({ formTitle, busy, onStart }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Answer form</CardTitle>
        <CardDescription>
          {formTitle ? `You are about to answer: ${formTitle}` : "Start a submission to answer this form."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={onStart} disabled={busy}>
          {busy ? "Starting..." : "Start"}
        </Button>
      </CardContent>
    </Card>
  );
}
