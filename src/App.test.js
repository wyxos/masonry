/**
 * @vitest-environment jsdom
 */

import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import App from './App.vue';
import WyxosMasonry from './components/WyxosMasonry.vue';

vi.mock('./components/WyxosMasonry.vue', () => ({
    default: {
        name: 'WyxosMasonry',
        template: '<div class="wyxos-masonry-mock"></div>',
    },
}));

describe('App.vue', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(App);
    });

    it('renders WyxosMasonry component', () => {
        // Check if WyxosMasonry is rendered
        const masonryComponent = wrapper.find('.wyxos-masonry-mock');
        expect(masonryComponent.exists()).toBe(true);
    });
});