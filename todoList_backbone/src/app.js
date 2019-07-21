var Backbone = require('../node_modules/backbone/backbone');
var $ = require('../node_modules/jquery/dist/jquery');
var _ = require('../node_modules/underscore/underscore');

var Item = Backbone.Model.extend({
  defaults: {
    text: '',
    isDone: false,
    editMode: false,
    isShow: true
  }
});

var Form = Backbone.Model.extend({
  defaults: {
    val: '',
    hasError: false,
    errorMsg: ''
  }
});

var form = new Form();

var Search = Backbone.Model.extend({
  defaults: {
    val: ''
  }
});

var search = new Search();

var LIST = Backbone.Collection.extend({
  model: Item
});

var item1 = new Item({text: 'sample todo1'});
var item2 = new Item({text: 'sample todo2'});
var list = new LIST([item1, item2]);

var ItemView = Backbone.View.extend({
  template: _.template($('#template-list-item').html()),
  events: {
    'click .js-toggle-done': 'toggleDone',
    'click .js-click-trash': 'remove',
    'click .js-todo_list-text': 'showEdit',
    'keyup .js-todo_list-editForm': 'closeEdit'
  },
  initialize: function(options) {
    _.bindAll(this, 'toggleDone', 'render', 'remove', 'showEdit', 'closeEdit');
    this.model.bind('change', this.render);
    this.model.bind('destroy', this.remove);
    this.render;
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
  showEdit: function() {
    this.model.set({editMode: true});
  },
  closeEdit: function(e) {
    if(e.keyCode === 13 && e.shiftKey === true) {
      this.model.set({text: e.currentTarget.value, editMode: false});
    }
  },
  render: function() {
    var template = this.template(this.model.attributes);
    this.$el.html(template);
    return this;
  }
});

var ListView = Backbone.View.extend({
  el: $('.js-todo_list'),
  initialize: function() {
    _.bindAll(this, 'render', 'addItem', 'appendItem');
    this.collection.bind('add', this.appendItem);
    this.render();
  },
  /**
   * 引数に文字列を渡すことでTODOを追加するメソッド
   * @param {String} text 
   */
  addItem: function(text) {
    var model = new Item({text: text});
    this.collection.add(model);
  },
  /**
   * 引数にmodelを渡すことでTODOを追加するメソッド
   * @param {Object} model 
   */
  appendItem: function(model) {
    var itemView = new ItemView({model: model});
    this.$el.append(itemView.render().el);
  },
  render: function() {
    var that = this;
    this.collection.each(function(model, i){
      that.appendItem(model);
    });
    return this;
  }
});

var listView = new ListView({collection: list});

var FormView = Backbone.View.extend({
  el: $('.js-form'),
  template: _.template($('#template-form').html()),
  model: form,
  events: {
    'click .js-add-todo': 'addTodo'
  },
  initialize: function() {
    _.bindAll(this, 'render', 'addTodo');
    this.model.bind('change', this.render);
    this.render();
  },
  addTodo: function(e) {
    e.preventDefault();
    var val = $('.js-get-val').val();
    if(!val) {
      this.model.set({hasError: true, errorMsg: 'TODOが空です'});
      $('.error').show();
    } else {
      this.model.set({val: val});
      listView.addItem(this.model.get('val'));
    }
  },
  render: function(){
    var template = this.template(this.model.attributes);
    this.$el.html(template);
    return this;
  }
});
new FormView();

var SearchView = Backbone.View.extend({
  el: $('.js-search'),
  template: _.template($('#template-search').html()),
  model: search,
  events: {
    'keyup .js-search-text': 'searchTodo'
  },
  initialize: function() {
    _.bindAll(this, 'render', 'searchTodo');
    this.model.bind('change', this.render);
    this.render();
  },
  searchTodo: function() {
    var searchText = $('.js-search-text').val();
    this.collection.forEach(function(e, i){
      e.set({isShow: true});
      var regrep = new RegExp('^' + searchText);
      var text = e.get('text');
      if( text && text.match(regrep)) {
        return true;
      };
      e.set({isShow: false});
    });
    return this;
  },
  render: function() {
    var template = this.template(this.model.attributes);
    this.$el.html(template);
    return this;
  }
});

var searchView = new SearchView({collection: list});