/**
 * @vitest-environment jsdom
 */

import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App.vue';
import { nextTick } from 'vue';
import { v4 as uuid } from 'uuid';

const generateMockPageItems = () => Array.from({ length: 48 }, (_, index) => ({
    id: index,
    key: uuid(),
    title: `Item ${index + 1}`,
    src: `https://picsum.photos/200/200?random=${index}`,
}));


describe('App.vue', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(App, {
            attachTo: document.body,
        });
    });

    it('loads initial page correctly', async () => {
        await nextTick();

        // Check if the initial page items are rendered
        const itemElements = wrapper.findAll('div.text-center');
        expect(itemElements.length).toBe(48);
    });

    it('loads next page on scroll to bottom', async () => {
        // Ensure initial page is loaded
        await nextTick();

        // Mock scroll to bottom
        const infiniteScrollDiv = wrapper.find('.infinite-scroll');
        infiniteScrollDiv.element.scrollTop = infiniteScrollDiv.element.scrollHeight;
        await infiniteScrollDiv.trigger('scroll');

        // Simulate next page load
        wrapper.vm.pages.push({ page: 2, items: generateMockPageItems() });
        await nextTick();

        // Ensure the next page has loaded
        expect(wrapper.vm.pages.length).toBe(2);
    });

    it('loads previous page on scroll to top', async () => {
        // Ensure initial page is loaded
        await nextTick();

        // Mock scroll to top
        const infiniteScrollDiv = wrapper.find('.infinite-scroll');
        infiniteScrollDiv.element.scrollTop = 0;
        await infiniteScrollDiv.trigger('scroll');

        // Simulate previous page load
        wrapper.vm.pages.unshift({ page: 0, items: generateMockPageItems() });
        await nextTick();

        // Ensure the previous page has loaded
        expect(wrapper.vm.pages[0].page).toBe(0);
    });

    it('maintains scroll position after loading previous page', async () => {
        // Set up initial pages
        wrapper.vm.pages = [
            { page: 4, items: generateMockPageItems() },
            { page: 5, items: generateMockPageItems() },
        ];
        await nextTick();

        const infiniteScrollDiv = wrapper.find('.infinite-scroll');
        infiniteScrollDiv.element.scrollTop = 100; // Set initial scroll position
        await nextTick();

        // Mock scroll to top
        infiniteScrollDiv.element.scrollTop = 0;
        await infiniteScrollDiv.trigger('scroll');

        // Simulate loading previous page
        wrapper.vm.pages.unshift({ page: 3, items: generateMockPageItems() });
        await nextTick();
        await nextTick(); // Wait for DOM updates to apply

        // Adjust scroll position to maintain user view
        infiniteScrollDiv.element.scrollTop = 100; // Reset to the previous scroll position
        await nextTick();

        // Ensure scroll position is maintained correctly
        expect(infiniteScrollDiv.element.scrollTop).toBe(100);
    });
});