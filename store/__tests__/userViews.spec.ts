import Vue, { VueConstructor } from 'vue';
import { createLocalVue } from '@vue/test-utils';
import Vuex, { Store } from 'vuex';
import cloneDeep from 'lodash/cloneDeep';
import { BaseItemDto } from '@jellyfin/client-axios';
import {
  state,
  mutations,
  actions,
  getters,
  UserViewsState,
  defaultState
} from '../userViews';

const DEMO_TEST_ITEM_A = {
  Name: 'test-view-a',
  Id: 'test-id-1',
  CollectionType: 'movies'
} as BaseItemDto;

const DEMO_TEST_ITEM_B = {
  Name: 'test-view-b',
  Id: 'test-id-2',
  CollectionType: 'music'
} as BaseItemDto;

const DEMO_TEST_ITEM_C = {
  Name: 'test-view-c',
  Id: 'test-id-3',
  CollectionType: ''
} as BaseItemDto;

let localVue: VueConstructor<Vue>;
let store: Store<UserViewsState>;

beforeEach(() => {
  localVue = createLocalVue();
  localVue.use(Vuex);

  store = new Vuex.Store(cloneDeep({ state, mutations, actions, getters }));
});

describe('vuex: userViews', () => {
  it('sets the user views when "SET_USER_VIEWS" is committed', () => {
    store.replaceState({ ...defaultState() });

    store.commit('SET_USER_VIEWS', {
      userViews: [DEMO_TEST_ITEM_A, DEMO_TEST_ITEM_B, DEMO_TEST_ITEM_C]
    });

    expect(store.state.views).toMatchObject([
      DEMO_TEST_ITEM_A,
      DEMO_TEST_ITEM_B,
      DEMO_TEST_ITEM_C
    ]);
  });

  it('clears the user views when "CLEAR_USER_VIEWS" is committed', () => {
    store.replaceState({
      views: [DEMO_TEST_ITEM_A, DEMO_TEST_ITEM_B, DEMO_TEST_ITEM_C]
    });

    store.commit('CLEAR_USER_VIEWS');

    expect(store.state.views).toMatchObject(defaultState().views);
  });

  it('clears the user views when clearUserViews is dispatched', () => {
    // TODO: This should only test if the proper mutation is committed
    store.replaceState({
      views: [DEMO_TEST_ITEM_A, DEMO_TEST_ITEM_B, DEMO_TEST_ITEM_C]
    });

    store.dispatch('clearUserViews');

    expect(store.state.views).toMatchObject(defaultState().views);
  });

  it('gets the navigation drawer items when getNavigationDrawerItems is called', () => {
    store.replaceState({
      views: [DEMO_TEST_ITEM_A, DEMO_TEST_ITEM_B, DEMO_TEST_ITEM_C]
    });

    expect(store.getters.getNavigationDrawerItems).toMatchObject([
      { icon: 'mdi-movie', title: 'test-view-a', to: '/library/test-id-1' },
      { icon: 'mdi-music', title: 'test-view-b', to: '/library/test-id-2' },
      { icon: 'mdi-folder', title: 'test-view-c', to: '/library/test-id-3' }
    ]);
  });

  it('gets all the user views when getUserViews is dispatched', () => {
    // TODO: This should only test if the proper mutation is committed
    store.replaceState({
      views: [DEMO_TEST_ITEM_A, DEMO_TEST_ITEM_B, DEMO_TEST_ITEM_C]
    });

    expect(store.getters.getUserViews).toMatchObject([
      DEMO_TEST_ITEM_A,
      DEMO_TEST_ITEM_B,
      DEMO_TEST_ITEM_C
    ]);
  });
});
