var Backbone = require('../node_modules/backbone/backbone');
var $ = require('../node_modules/jquery/dist/jquery');
var _ = require('../node_modules/underscore/underscore');

var Item = Backbone.Model.extend({
  defaults: {
    text: '',
    isDone: false,
    editMode: false
  }
});
var item1 = new Item({text: 'sample todo1'});

var ItemView = Backbone.View.extend({
  events: {
    'click .js-toggle-done': 'toggleDone',
    'click .js-click-trash': 'remove',
    'click .js-todo_list-text': 'showEdit',
    'click .js-todo_list-editForm': 'closeEdit'
  },
  initialize: function(options) {
    _.bindAll(this, 'toggleDone', 'render', 'remove', 'showEdit', 'closeEdit');
    this.model.bind('change', this.render);
    this.model.bind('destroy', this.remove);
  },
  update: function(text) {
    this.model.set({text: text});
  },
  toggleDone: function() {
    this.model.set({isDone: !this.model.get('isDone')});
  },
  remove: function() {
    $(this.el).remove();
    return this;
  },
  showEdit: function(e) {
    this.model.set({editMode: true});
  },
  closeEdit: function(e) {
    if(e.keyCode === 13 && e.shiftKey === true) {
      this.model.set({text: e.currentTarget.value, editMode: false});
    }
  },
  render: function() {
    console.log('render');
    var compiled = _.template($('#template-list-item').html());
    $(this.el).html(compiled(this.model.attributes));
    return this;
  }
});

var itemView = new ItemView({el: $('.js-todo_list'), model: item1});
itemView.update('sample test');