let nextId = 0;

export default {
  namespaced: true,
  state: {
    notifications: [],
  },
  mutations: {
    PUSH(state, notification) {
      state.notifications.push({
        ...notification,
        id: (nextId += 1),
      });
    },
    DELETE(state, notificationToRemove) {
      state.notifications = state.notifications.filter((notification) => notification.id !== notificationToRemove.id);
    },
  },
  actions: {
    add_notification(context, notification) {
      context.commit('PUSH', notification);
    },
    remove_notification(context, notificationToRemove) {
      context.commit('DELETE', notificationToRemove);
    },
  },
  getters: {},
};
