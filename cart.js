//Creo mi constructor
function Cart(element,options){
	this.options = $.extend({}, Cart.DEFAULTS, options);
	this.element = element;
	this.$element = $(element);
	this.init();
	this.counter = 0
}



//extiendo mis funciones en mi prototipo
$.extend(Cart.prototype,{
	init:function() {
		console.log('Comienza la mandanga');
	},
	total_product:function(product){
		var total = this.$element.find(this.options.product).text();
		var _isnumber = $.isNumeric(product);
		if (_isnumber) {
			this.$element.find(this.options.product).text(product);
		}else {
			this.$element.find(this.options.alerts).text('Tienes que introducir un número para el número de producto');
		}
		
	},
	total_price:function(price){
		var _isnumber = $.isNumeric(price);
		if (_isnumber) {
			this.$element.find(this.options.prices).text(price);
		}else {
			this.$element.find(this.options.alerts).text('Tienes que introducir un número para el precio');
		}

	},
	add_product:function(add){
		var _element =this.$element.find(this.options.items).append(this.options.element);
		var _product = $('li:last-child',this.options.items);
		var _counter = $(this.options.items).find('li').length;
		_product.addClass('item'+(++this.counter));
		
		
		if (add.name === undefined || add.price === undefined || add.quantity === undefined){
			this.$element.find(this.options.alerts).text("Te falta algún dato melón");
		}else {
			_product.append(this.options.build_item(add.name,add.price,add.quantity));
		}

		
	},
	delete_product:function(delete_pro){
		var _delete = $(this.options.items).find(delete_pro);
		if (_delete.length) {

			_delete.remove();

		}else {

			this.$element.find(this.options.alerts).text('No existe el elemento a eliminar');
		}
		
	}
	
});


//propiedades de mi plugin por defecto
Cart.DEFAULTS = {
	product:'#product',
	prices:'#total_price',
	items:'.items',
	element:'<li></li>',
	alerts:'.alerts',
	build_item:function(name,price,quantity){
		return '<p>'+ name +'</p>' + '<p>'+ price +'</p>' + '<p>'+ quantity +'</p>'
	}
	
};

//

$.fn.cart = function(options){
	return $(this).each(function(){
		var self = $(this);
		if(!self.data("cart")){
			self.data("cart", new Cart(this, options));
		}
	});
};