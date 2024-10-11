/**
 * @vitest-environment jsdom
 */

import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Masonry from './WyxosMasonry.vue';
import { nextTick } from 'vue';
import { v4 as uuid } from 'uuid';

const generateMockPageItems = () => Array.from({ length: 48 }, (_, index) => ({
    id: index,
    key: uuid(),
    title: `Item ${index + 1}`,
    src: `https://picsum.photos/200/200?random=${index}`,
}));

describe('Masonry.vue', () => {
    let wrapper;
    let mockLoad, mockLoadNext, mockLoadPrevious;

    beforeEach(() => {
        mockLoad = vi.fn().mockResolvedValue();
        mockLoadNext = vi.fn().mockResolvedValue();
        mockLoadPrevious = vi.fn().mockResolvedValue();

        wrapper = mount(Masonry, {
            props: {
                load: mockLoad,
                loadNext: mockLoadNext,
                loadPrevious: mockLoadPrevious,
                items: generateMockPageItems(),
            },
        });
    });

    it('loads initial page correctly', async () => {
        await nextTick();
        await wrapper.vm.$nextTick(); // Wait for the component to be ready

        // Check if the initial page items are rendered
        const itemElements = wrapper.findAll('div > img');
        expect(itemElements.length).toBe(48);
    });

    it('loads next page on scroll to bottom', async () => {
        await nextTick();
        await wrapper.vm.$nextTick();

        // Mock scroll to bottom
        const infiniteScrollDiv = wrapper.find('.infinite-scroll');
        infiniteScrollDiv.element.scrollTop = 1000;
        await infiniteScrollDiv.trigger('scroll');

        // Ensure the loadNext function has been called
        expect(mockLoadNext).toHaveBeenCalled();
    });

    it('loads previous page on scroll to top', async () => {
        await nextTick(); // Ensure the initial setup is complete
        await wrapper.vm.$nextTick();

        // Set the scroll position to simulate starting somewhere in the middle
        const infiniteScrollDiv = wrapper.find('.infinite-scroll');
        infiniteScrollDiv.element.scrollTop = 500; // Start from a non-zero scroll position
        await nextTick();

        // Now simulate scrolling to the top by setting scrollTop to 0
        infiniteScrollDiv.element.scrollTop = 0;

        // Manually call the scroll event handler to simulate the behavior
        await infiniteScrollDiv.trigger('scroll');
        await wrapper.vm.throttledOnScroll();  // If throttled, ensure the handler is called

        // Wait for Vue updates after the scroll event
        await nextTick();

        // Ensure the loadPrevious function has been called
        expect(mockLoadPrevious).toHaveBeenCalled();
    });

    it('maintains scroll position after loading previous page', async () => {
        await nextTick();
        await wrapper.vm.$nextTick();

        // Set initial scroll position
        const infiniteScrollDiv = wrapper.find('.infinite-scroll');
        infiniteScrollDiv.element.scrollTop = 500;
        await nextTick();

        // Mock scroll to top
        infiniteScrollDiv.element.scrollTop = 0;
        await infiniteScrollDiv.trigger('scroll');

        // Ensure the loadPrevious function has been called
        expect(mockLoadPrevious).toHaveBeenCalled();

        // Simulate loading previous page and adjust scroll
        wrapper.setProps({ items: [...generateMockPageItems(), ...wrapper.props().items] });
        await nextTick(); // Wait for items to be added to the DOM

        // Wait for scroll height adjustment to stabilize
        let retries = 10; // Set a retry limit to avoid infinite loops
        while (retries > 0 && infiniteScrollDiv.element.scrollTop === 0) {
            await nextTick();
            retries--;
        }

        // Ensure scroll position is maintained correctly
        expect(infiniteScrollDiv.element.scrollTop).toBeGreaterThan(0);
    });
});
