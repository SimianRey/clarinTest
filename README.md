# clarinTest
Clarin Test

Se inicio con react-create-app y express para un template básico.
No se incluyen mecanismos de auth ni log ya que no estaban en el pedido, de ser requerido se podrían agregar rápidamente.

Se espera un server MongoDB en 'localhost', port: 27017. SI no existe falla al arranque, si se quiere modificar,
los valores a cambiar están en el objeto 'config' de app.js

La api nodeJs correrá en el puerto 33111, en caso de querés cambiarlo,el valor a cambiar están en el objeto 'config' de app.js

Para iniciar se puede usar 'npn start' o node 'app.js'

React
Dada el tamaño del proyecto y la necesidad de compartir (o la NO necesidad) el estado entre componentes, se utilizo react Hooks (useState y useEffects), para el manejo del mismo, en el caso de que la aplicación lo requiera se podría utilizar redux para manejo central del estado.
Ya esta la versión compilada en /public, el source se encuentra en la carpeta /clientApp
para acceder a la app http:\\localhost:33111

