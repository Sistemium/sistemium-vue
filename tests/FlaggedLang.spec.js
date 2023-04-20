import { mount } from '@vue/test-utils';
import { expect, describe, it } from 'vitest';
import FlaggedLang from '../components/FlaggedLang.vue';

describe('ConfirmButton.vue', () => {

  it('renders element', async () => {

    const text = 'lang name';
    const wrapper = mount(FlaggedLang, {
      propsData: {
        text,
      },
    });
    expect(wrapper.text())
      .to
      .include(text);
  });

});
