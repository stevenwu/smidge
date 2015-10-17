import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    return this.get('session').fetch().catch(function() {});
  },

  actions: {
    signIn(provider) {
      this.get('session').open('firebase', { provider: provider}).then(function(data) {
        const user = this.store.create('user', {
          uid: data.uid,
          username: data.currentUser.username
        });

        user.save();
      });
    },

    signOut() {
      this.get('session').close();
    }
  }
});
