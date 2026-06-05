import { AssessmentForm } from "@/components/AssessmentForm";
import { PageHeader } from "@/components/PageHeader";

export default function AssessmentPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Free assessment"
        title="Build your pet profile"
        text="Answer a few simple questions and get an educational insurance value snapshot for your dog or cat."
      />
      <AssessmentForm />
    </main>
  );
}
