import { mount } from "@vue/test-utils";
import ShowDetail from "../ShowDetail.vue";

describe("ShowDetail.vue", () => {
  it("renders ShowDetail", () => {
    const wrapper = mount(ShowDetail, {
      data: {
        details: {
          name: "Test show",
        },
      },
    });
    expect(wrapper.text()).toMatch("Details");
  });
});
