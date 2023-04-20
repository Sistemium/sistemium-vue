import { mount } from '@vue/test-utils';
import { expect, describe, it } from 'vitest';
import ConfirmButton from '../components/ConfirmButton.vue';

describe('ConfirmButton.vue', () => {

  it('emits confirm', async () => {

    this.timeout = 5000;

    const text = 'new message';
    const confirmText = 'confirm me';
    const wrapper = mount(ConfirmButton, {
      propsData: {
        text,
        confirmText,
      },
    });
    expect(wrapper.text())
      .to
      .include(text);

    await wrapper.get('el-button')
      .trigger('click');

    expect(wrapper.text())
      .to
      .include(confirmText);

    const button = await wrapper.get('el-button');
    expect(button.attributes().disabled).toBeDefined();

    await new Promise(resolve => {
      setTimeout(resolve, 2500);
    });

    await wrapper.get('el-button')
      .trigger('click');

    expect(wrapper.emitted())
      .toHaveProperty('confirm');

  });

});
