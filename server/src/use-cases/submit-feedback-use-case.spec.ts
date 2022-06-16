import { SubmitFeedbackUseCase } from "./submit-feedback-use-case";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe("Submit feedback", () => {
  it("should be able to submit a feedback", async () => {
    await expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "test comment",
        screenshot: "data:image/png;base64,a089uhr09ruhfas9uhf9asuhfsa9hu",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();

  });

  it("should be not able to submit a  without type", () => {
    expect(
      submitFeedback.execute({
        type: "",
        comment: "test comment",
        screenshot:
          "data:image/png;base64,a089uhr09ruhfas9uhf9asuhfsa9hu",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit a feedback without a comment", () => {
    expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "",
        screenshot:
          "data:image/png;base64,a089uhr09ruhfas9uhf9asuhfsa9hu",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit a feedback with an invalid image format", () => {
    expect(
      submitFeedback.execute({
        type: "BUG",
        comment: "test comment",
        screenshot: "test.jpg",
      })
    ).rejects.toThrow();
  });
});
