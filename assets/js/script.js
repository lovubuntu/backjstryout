$(function(){
	var Service = Backbone.Model.extend({
		defaults: {
			name: "Some good name",
			price: 123,
			checked: false
		},

		toggle: function(){
			this.set('checked', !this.get('checked'));
		}
	});

	var ServiceList = Backbone.Collection.extend({
		model: Service,

		getChecked: function(){
			return this.where({checked: true});
		}
	});

	var services = new ServiceList([
			new Service({name: "Translation Service", price: 450}),
			new Service({name: "Tour Guide Service", price: 650}),
			new Service({name: "Rental Services", price: 850})
		]);

	var ServiceView = Backbone.View.extend({
		tagName: 'li',

		events: {
			click: 'toggleService'
		},

		initialize: function(){
			this.listenTo(this.model, 'change', this.render);
		},

		render: function(){
			this.$el.html('<input type="checkbox" value=1 name="'+this.model.get('name') + '"/>' + this.model.get('name') + '<span> Rs. ' + this.model.get('price') + '</span>');
			this.$('input').prop('checked', this.model.get('checked'));
			return this;
		},

		toggleService: function(){
			this.model.toggle();
		}
	});

	var ServicesView = Backbone.View.extend({
		el: $('#main'),
		
		initialize: function(){
			this.total = $('#total span');
			this.listOfServices = $('#services');
			this.listenTo(services, 'change', this.render);

			services.each(function(service){
				var serviceView = new ServiceView({ model: service});
				this.listOfServices.append(serviceView.render().el);
			}, this);
		},

		render: function(){
			var total = 0;
			_.each(services.getChecked(), function(service){
				total += service.get('price');
			})
			this.total.text('Rs. '+total);
			return this;
		}
	});
	new ServicesView();
});