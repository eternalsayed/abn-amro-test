import { mount } from "@vue/test-utils";
import TvDashboard from "../TvDashboard.vue";

describe("TvDashboard.vue", () => {
  it("renders TvDashboard", () => {
    const wrapper = mount(TvDashboard);
    expect(wrapper.text()).toMatch("Dashboard");
  });
});
