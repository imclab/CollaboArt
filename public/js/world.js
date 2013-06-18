var World = function() {
  
 var container, stats;

      var camera, scene, renderer;

      var mesh, zmesh, lightMesh, geometry;

      var mouseX = 0, mouseY = 0;

      var windowHalfX = window.innerWidth / 2;
      var windowHalfY = window.innerHeight / 2;

      document.addEventListener( 'mousemove', onDocumentMouseMove, false );

      init();
      animate();


      function init() {

        container = document.createElement( 'div' );
        document.body.appendChild( container );

        camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.set( 100000, 0, 3200 );

        scene = new THREE.Scene();

        var colors = [ 0x000000, 0xff0080, 0x8000ff, 0xffffff ];
        var geometry = new THREE.Geometry();

        for ( var i = 0; i < 2000; i ++ ) {

          var vertex = new THREE.Vector3();
          vertex.x = Math.random() * 4000 - 2000;
          vertex.y = Math.random() * 4000 - 2000;
          vertex.z = Math.random() * 4000 - 2000;
          geometry.vertices.push( vertex );

          geometry.colors.push( new THREE.Color( colors[ Math.floor( Math.random() * colors.length ) ] ) );

        }

        var material = new THREE.ParticleBasicMaterial( { size: 1, vertexColors: THREE. VertexColors, depthTest: false, opacity: 0.5, sizeAttenuation: false, transparent: true } );

        var mesh = new THREE.ParticleSystem( geometry, material );
        scene.add( mesh );

        renderer = new THREE.WebGLRenderer( { preserveDrawingBuffer: true } );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.sortObjects = false;
        renderer.autoClearColor = false;
        container.appendChild( renderer.domElement );

        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '0px';
        stats.domElement.style.zIndex = 100;
        container.appendChild( stats.domElement );

        //

        window.addEventListener( 'resize', onWindowResize, false );

      }

      function onWindowResize() {

        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

      }

      function onDocumentMouseMove(event) {

        mouseX = ( event.clientX - windowHalfX ) * 10;
        mouseY = ( event.clientY - windowHalfY ) * 10;

      }

      //

      function animate() {

        requestAnimationFrame( animate );

        render();
        stats.update();

      }

      function render() {

        camera.position.x += ( mouseX - camera.position.x ) * .05;
        camera.position.y += ( - mouseY - camera.position.y ) * .05;

        camera.lookAt( scene.position );

        renderer.render( scene, camera );

      }
 
 
}





