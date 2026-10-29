import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import emailjs from "@emailjs/browser";
import { ContactForm } from "./contact-form";

vi.mock("@emailjs/browser", () => ({ default: { init: vi.fn(), send: vi.fn() } }));
beforeEach(() => { vi.clearAllMocks(); });
afterEach(cleanup);
function fill() {
  fireEvent.change(screen.getByLabelText("Full Name"), { target: { value: " Test Visitor " } });
  fireEvent.change(screen.getByLabelText("Email Address"), { target: { value: "visitor@example.com" } });
  fireEvent.change(screen.getByLabelText("Subject"), { target: { value: "Portfolio inquiry" } });
  fireEvent.change(screen.getByLabelText("Message"), { target: { value: "Hello Zamzam" } });
}
describe("Contact email", () => {
  it("rejects required fields and malformed email without sending", () => {
    render(<ContactForm />);
    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));
    expect(emailjs.send).not.toHaveBeenCalled();
    expect(screen.getByLabelText("Full Name")).toHaveAttribute("aria-invalid", "true");
    fill();
    fireEvent.change(screen.getByLabelText("Email Address"), { target: { value: "invalid" } });
    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));
    expect(screen.getByLabelText("Email Address")).toHaveAttribute("aria-invalid", "true");
    expect(emailjs.send).not.toHaveBeenCalled();
  });
  it("maps the supplied service, template, recipient and fields and waits for acceptance", async () => {
    let accept: ((result: { status: number; text: string }) => void) | undefined;
    vi.mocked(emailjs.send).mockImplementation(() => new Promise((resolve) => { accept = resolve; }));
    render(<ContactForm />); fill();
    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));
    fireEvent.submit(screen.getByLabelText("Full Name").closest("form") as HTMLFormElement);
    expect(emailjs.send).toHaveBeenCalledTimes(1);
    expect(emailjs.init).toHaveBeenCalledWith({ publicKey: "ngEQ5-d2RZ__zZ0zB" });
    expect(emailjs.send).toHaveBeenCalledWith("service_t82f4dt", "template_hkpuk18", {
      from_name: "Test Visitor", from_email: "visitor@example.com", reply_to: "visitor@example.com",
      subject: "Portfolio inquiry", message: "Hello Zamzam", to_email: "samsamcabdi25@gmail.com", to_name: "Zamzam Abdikadir Farah",
    });
    expect(screen.getByRole("button")).toBeDisabled();
    expect(screen.queryByRole("status")).toBeNull();
    accept?.({ status: 200, text: "OK" });
    await waitFor(() => expect(screen.getByRole("status")).toBeInTheDocument());
    expect(screen.getByLabelText("Message")).toHaveValue("");
  });
  it("retains input and never reports success on failed requests", async () => {
    vi.mocked(emailjs.send).mockRejectedValue({ status: 400 });
    render(<ContactForm />); fill();
    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));
    await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());
    expect(screen.queryByRole("status")).toBeNull();
    expect(screen.getByLabelText("Message")).toHaveValue("Hello Zamzam");
    expect(screen.getByRole("button")).toBeEnabled();
  });
  it("does not accept a non-200 SDK response as success", async () => {
    vi.mocked(emailjs.send).mockResolvedValue({ status: 202, text: "Pending" });
    render(<ContactForm />); fill();
    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));
    await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());
    expect(screen.queryByRole("status")).toBeNull();
    expect(screen.getByLabelText("Message")).toHaveValue("Hello Zamzam");
  });
});