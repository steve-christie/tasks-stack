import type { RenderOptions } from "@testing-library/react";
import { render, waitFor } from "@testing-library/react";
import { PreloadedState } from "redux";
import { ApplicationState, AppStore, setupStore } from "../../state/Store";
import { MemoryRouter, MemoryRouterProps, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import React from "react";
import dayjs from "dayjs";
import Task, { ITaskProps } from "./Task";
import { vi, expect } from "vitest";
import userEvent from "@testing-library/user-event";

describe("Task Unit Tests", () => {
  const user = userEvent.setup();

  const renderTaskCard = (props?: Partial<ITaskProps>) => {
    const opts: ITaskProps = {
      task: props?.task || {
        title: "foo",
        createdDate: "2023-04-05",
        dueDate: "2023-05-05",
        completedDate: "2023-04-08",
        assignedTo: "bar",
        status: "To Do",
      },
      onDelete: props?.onDelete || vi.fn,
      onUpdate: props?.onUpdate || vi.fn,
      deletingTask: props?.deletingTask || false,
      updatingTask: props?.updatingTask || false,
    };
    return renderWithProviders(<Task {...opts} />);
  };

  it("When task is overdue, overdue ribbon should show", () => {
    const now = dayjs();
    const createdDate = now.subtract(2, "month");
    const dueDate = now.subtract(1, "month");

    const task = renderTaskCard({
      task: {
        title: "foo",
        createdDate: createdDate.toISOString(),
        dueDate: dueDate.toISOString(),
        assignedTo: "bar",
        status: "To Do",
      },
    });

    const overdueRibbon = task.render.getByText("Overdue");
    expect(overdueRibbon).toBeInTheDocument();
  });

  it("When task is on time, no overdue ribbon should show", () => {
    const now = dayjs();
    const createdDate = now.subtract(2, "month");
    const dueDate = now.add(1, "month");

    const task = renderTaskCard({
      task: {
        title: "foo",
        createdDate: createdDate.toISOString(),
        dueDate: dueDate.toISOString(),
        assignedTo: "bar",
        status: "To Do",
      },
    });

    const overdueRibbon = task.render.queryByText("Overdue");
    expect(overdueRibbon).toBeNull();
  });

  it("When user presses the delete icon, the delete action is called ", async () => {
    const deleteFn = vi.fn();

    const task = renderTaskCard({
      onDelete: deleteFn,
    });

    const deleteIcon = task.render.getByTestId("deleteIcon");
    await user.click(deleteIcon);

    await waitFor(() => {
      expect(deleteFn.mock.calls.length).toBe(1);
    });
  });
});

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  preloadedState?: PreloadedState<ApplicationState>;
  store?: AppStore;
  urlParams?: string;
}

type WrapperProps = {
  children: React.ReactNode;
};

const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    urlParams = "",
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const Wrapper = ({ children }: WrapperProps) => {
    const memoryRouterProps: MemoryRouterProps = {};
    if (urlParams) {
      memoryRouterProps.initialEntries = [`/foo`, `?${urlParams}`];
    }
    return (
      <Provider store={store}>
        <MemoryRouter {...memoryRouterProps}>
          <Routes>
            <Route path={"/*"} element={children} />
            <Route path={"/*/:tab?"} element={children} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  };
  return { store, render: render(ui, { wrapper: Wrapper, ...renderOptions }) };
};
