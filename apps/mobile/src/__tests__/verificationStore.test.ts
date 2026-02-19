import { useVerificationStore } from "../store/verificationStore";
import { getStatus, startProcessing } from "../api/services";

// Mock the API services
jest.mock("../api/services", () => ({
  getStatus: jest.fn(),
  startProcessing: jest.fn(),
}));

describe("verificationStore", () => {
  beforeEach(() => {
    // Reset store
    useVerificationStore.setState({
      status: "NOT_STARTED",
      record: null,
      loading: false,
      error: null,
    });
    jest.clearAllMocks();
  });

  it("should initialize with default values", () => {
    const state = useVerificationStore.getState();
    expect(state.status).toBe("NOT_STARTED");
    expect(state.loading).toBe(false);
    expect(state.record).toBeNull();
  });

  it("should fetch status successfully", async () => {
    const mockResponse = {
      status: "IN_PROGRESS",
      updatedAt: "2024-01-01T00:00:00Z",
      details: { reasons: [] },
    };
    (getStatus as jest.Mock).mockResolvedValue(mockResponse);

    await useVerificationStore.getState().fetchStatus();

    const state = useVerificationStore.getState();
    expect(state.status).toBe("IN_PROGRESS");
    expect(state.record).toEqual(mockResponse);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it("should handle fetch status error", async () => {
    const errorMsg = "Network Error";
    (getStatus as jest.Mock).mockRejectedValue({
      response: { data: { error: { message: errorMsg } } },
    });

    await useVerificationStore.getState().fetchStatus();

    const state = useVerificationStore.getState();
    expect(state.error).toBe(errorMsg);
    expect(state.loading).toBe(false);
  });

  it("should start processing and then fetch status", async () => {
    const mockStatusResponse = {
      status: "IN_PROGRESS",
      updatedAt: "2024-01-01T00:00:00Z",
      details: { reasons: [] },
    };
    (startProcessing as jest.Mock).mockResolvedValue({
      status: "PROCESSING_STARTED",
      estimatedTime: "5-10s",
    });
    (getStatus as jest.Mock).mockResolvedValue(mockStatusResponse);

    await useVerificationStore.getState().startProcessing();

    expect(startProcessing).toHaveBeenCalledTimes(1);
    expect(getStatus).toHaveBeenCalledTimes(1);

    const state = useVerificationStore.getState();
    expect(state.status).toBe("IN_PROGRESS");
    expect(state.loading).toBe(false);
  });

  it("should clear error", () => {
    useVerificationStore.setState({ error: "Some error" });
    useVerificationStore.getState().clearError();
    expect(useVerificationStore.getState().error).toBeNull();
  });
});
