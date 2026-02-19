import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { Button } from "../components/Button/Button";
import { useTheme } from "../theme/useTheme";
import { lightTheme } from "../theme/tokens";

// Mock useTheme hook
jest.mock("../theme/useTheme");

describe("Button Component", () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    (useTheme as jest.Mock).mockReturnValue(lightTheme);
    mockOnPress.mockClear();
  });

  it("renders correctly with title", () => {
    const { getByText } = render(
      <Button title="Click Me" onPress={mockOnPress} />,
    );

    expect(getByText("Click Me")).toBeTruthy();
  });

  it("calls onPress when clicked", () => {
    const { getByText } = render(
      <Button title="Press Me" onPress={mockOnPress} />,
    );

    fireEvent.press(getByText("Press Me"));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is true", () => {
    const { UNSAFE_getByType } = render(
      <Button title="Disabled" onPress={mockOnPress} disabled={true} />,
    );

    const { TouchableOpacity } = require("react-native");
    const touchable = UNSAFE_getByType(TouchableOpacity);
    expect(touchable.props.disabled).toBe(true);
  });

  it("shows activity indicator when loading", () => {
    const { queryByText, UNSAFE_getByType } = render(
      <Button title="Loading" onPress={mockOnPress} loading={true} />,
    );

    // Title should not be visible when loading
    expect(queryByText("Loading")).toBeNull();

    // ActivityIndicator should be present
    const { ActivityIndicator } = require("react-native");
    expect(UNSAFE_getByType(ActivityIndicator)).toBeTruthy();
  });
});
