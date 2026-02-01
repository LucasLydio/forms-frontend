export type QuestionType = "text" | "checkbox" | "radio";
export type SubmissionStatus = "in_progress" | "submitted";

export type Form = {
  id: string;
  ownerUserId: string;
  title: string;
  description?: string | null;

  isPublished: boolean;
  publishedAt?: string | null;

  createdAt: string;
  updatedAt: string;
};

export type QuestionOption = {
  id: string;
  questionId: string;
  label: string;
  value: string;
  orderIndex: number;

  createdAt: string;
  updatedAt: string;
};

// export type Question = {
//   id: string;
//   formId?: string;
//   prompt: string;
//   type: QuestionType;
//   isRequired: boolean;
//   orderIndex: number;

//   minChoices?: number | null;
//   maxChoices?: number | null;

//   createdAt: string;
//   updatedAt: string;

//   options?: QuestionOption[];
// };

export type FormWithQuestions = Form & {
  questions: QuestionDTO[];
};

export type FormSubmission = {
  id: string;
  formId: string;
  respondentUserId: string;
  status: SubmissionStatus;

  startedAt: string;
  submittedAt?: string | null;

  createdAt: string;
  updatedAt: string;

  answers?: Array<{
    questionId: string;
    textValue?: string | null;
    selectedOptions: Array<{
      optionId: string;
    }>;
  }>;
};

export type CreateFormDTO = {
  title: string;
  description?: string | null;
};

export type QuestionDTO = {
    id: string;
    createdAt: string;
    updatedAt: string;
    formId: string;
    prompt: string;
    type: QuestionType;
    isRequired: boolean;
    orderIndex: number;
    minChoices?: number | null;
    maxChoices?: number | null;
    options: OptionDTO;
};

export type OptionDTO = {
    id: string;
    createdAt?: Date;
    updatedAt?: Date;
    questionId?: string;
    orderIndex: number;
    label: string;
    value: string;
};

export type UpdateFormDTO = Partial<CreateFormDTO> & {
  isPublished?: boolean;
};


export type StartSubmissionDTO = {
  formId: string;
};

export type UpsertAnswersDTO = {
  questionId: string;
  textValue?: string;          
  selectedOptionIds?: string[];      
};

export type SubmitAnswersDTO = {
  submissionId: string;
  answers: UpsertAnswersDTO[];
};
