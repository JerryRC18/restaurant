<template>
<v-container>
  <v-data-table
    :headers="headers"
    :items="comidas"
    :items-per-page="5"
 
  >
  <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-tittle>Comidas</v-toolbar-tittle>
        <v-spacer></v-spacer>
        <v-btn color='success' @click="nl_dialog = true">Nueva Comida</v-btn>
      </v-toolbar>
  </template>


  <template v-slot:[`item.actions`]="{item}">
    <v-icon @click="eliminar_comida(item)" small>
      fas fa-trash
    </v-icon>
  </template>
</v-data-table>

<v-dialog v-model='nl_dialog' max-width="500px">
    <v-card>
      <v-card-title>
        Nueva Comida
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols='6'>
              <v-text-field v-model="nueva_comida.com_producto" label ='Comida'>
              </v-text-field> 
            </v-col>
            <v-col cols='6'>
              <v-text-field v-model="nueva_comida.com_precio" label ='Precio'>
              </v-text-field>
            </v-col>
            <v-select
                :items="categorias"
                v-model="nueva_comida.com_cat_id"
                label="Categoría"
            >
            </v-select>
          </v-row>
        </v-container>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color='success' @click="guardar()">Guardar</v-btn>
        <v-btn color='error' @click="cancelar()">Cancelar</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
      </v-card-text>
    </v-card>
</v-dialog>

</v-container>

</template>

<script>
 

  export default {
    name: 'Home',

     data () {
      return {
        headers: [
          {
            text: 'Identificador',
            align: 'start',
            sortable: false,
            value: 'com_id',
          },
          { text: 'Comida', value: 'com_producto' },
          { text: 'Precio', value: 'com_precio' },
          { text: 'Categoria', value: 'com_categoria' },
          { text: 'Acciones', value: 'actions'}
        ],
        comidas: [],
        categorias: [],

        nl_dialog: false,

        nueva_comida: {
          com_producto: '',
          com_precio: '',
          com_cat_id: ''

        },

        }
          
    },

    created(){
        this.llenar_comidas();
        this.llenar_categorias();
      },

    methods: {

      async llenar_categorias(){
            const api_data = await this.axios.get('/categorias/todas_las_categorias/');
            api_data.data.forEach((item) => {
                this.categorias.push ({
                    text: item.com_categoria, 
                    value: item.cat_id

                });
            });
        },

      async llenar_comidas(){
        const api_data = await this.axios.get('/comidas/todas_las_comidas/');
        this.comidas = api_data.data;

      },

      async eliminar_comida(item){
        const body = {
          com_id: item.com_id
        };
      await this.axios.post('/comidas/eliminar_comida', body);
      
      this.llenar_comidas();

      },

      cancelar(){
        this.nueva_comida = {};
        this.nl_dialog = false;
      },

      async guardar(){
        await this.axios.post('comidas/nueva_comida', this.nueva_comida);
        this.llenar_comidas();
        this.cancelar();

      },


      
    },

    components: {
  
    },
  }
</script>
