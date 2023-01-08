$(document).ready(function(){

	// Asignar clase activa en el primer botón
	$('.submenu-d .subcategoria[category="all"]').addClass('subcategoria-activo');
	$('.submenu-m .subcategoria[category="all"]').addClass('subcategoria-activo');

	// Filtro de productos
	$('.subcategoria').click(function(){
		var catProduct = $(this).attr('category');

		// Asignar clase activa en botón apretado
		$('.subcategoria').removeClass('subcategoria-activo');
		$(this).addClass('subcategoria-activo');

		// Función de ocultar productos
		$('.filtro').css('transform', 'scale(0)');
		function hideProduct(){
			$('.filtro').hide();
		} setTimeout(hideProduct,200);

		// Función de mostrar productos
		function showProduct(){
			$('.filtro[category="'+catProduct+'"]').show();
			$('.filtro[category="'+catProduct+'"]').css('transform', 'scale(1)');
		} setTimeout(showProduct,200);
	});

	// Mostrar todos los productos
	$('.subcategoria[category="all"]').click(function(){
		function showAll(){
			$('.filtro').show();
			$('.filtro').css('transform', 'scale(1)');
		} setTimeout(showAll,200);
	});

	// Mostrar todos Manuales
	$('.ManualesTodo').click(function(){
		// Función de ocultar productos
		$('.filtro').css('transform', 'scale(0)');
		function hideProduct(){
			$('.filtro').hide();
		} setTimeout(hideProduct,200);

		// Función de mostrar productos
		function showProduct(){
			$('.Manuales').show();
			$('.filtro').css('transform', 'scale(1)');
		} setTimeout(showProduct,200);
	});

	// Mostrar todos Electricas
	$('.ElectricasTodo').click(function(){
		// Función de ocultar productos
		$('.filtro').css('transform', 'scale(0)');
		function hideProduct(){
			$('.filtro').hide();
		} setTimeout(hideProduct,200);

		// Función de mostrar productos
		function showProduct(){
			$('.Electricas').show();
			$('.filtro').css('transform', 'scale(1)');
		} setTimeout(showProduct,200);
	});

	// Mostrar todos Accesorios
	$('.AccesoriosTodo').click(function(){
		// Función de ocultar productos
		$('.filtro').css('transform', 'scale(0)');
		function hideProduct(){
			$('.filtro').hide();
		} setTimeout(hideProduct,200);

		// Función de mostrar productos
		function showProduct(){
			$('.Accesorios').show();
			$('.filtro').css('transform', 'scale(1)');
		} setTimeout(showProduct,200);
	});

	// Mostrar todos Medicion
	$('.MedicionTodo').click(function(){
		// Función de ocultar productos
		$('.filtro').css('transform', 'scale(0)');
		function hideProduct(){
			$('.filtro').hide();
		} setTimeout(hideProduct,200);

		// Función de mostrar productos
		function showProduct(){
			$('.Medicion').show();
			$('.filtro').css('transform', 'scale(1)');
		} setTimeout(showProduct,200);
	});

	// Mostrar todos Elevacion
	$('.ElevacionTodo').click(function(){
		// Función de ocultar productos
		$('.filtro').css('transform', 'scale(0)');
		function hideProduct(){
			$('.filtro').hide();
		} setTimeout(hideProduct,200);

		// Función de mostrar productos
		function showProduct(){
			$('.Elevacion').show();
			$('.filtro').css('transform', 'scale(1)');
		} setTimeout(showProduct,200);
	});

	// Mostrar todos Seguridad
	$('.SeguridadTodo').click(function(){
		// Función de ocultar productos
		$('.filtro').css('transform', 'scale(0)');
		function hideProduct(){
			$('.filtro').hide();
		} setTimeout(hideProduct,200);

		// Función de mostrar productos
		function showProduct(){
			$('.Seguridad').show();
			$('.filtro').css('transform', 'scale(1)');
		} setTimeout(showProduct,200);
	});
});