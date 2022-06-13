<template>
<v-container>
  <v-data-table
    :headers="headers"
    :items="meseros"
    :items-per-page="5"
 
  >
  <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-tittle>Meseros</v-toolbar-tittle>
        <v-spacer></v-spacer>
        <v-btn color='success' @click="nl_dialog = true">Nuevo Mesero</v-btn>
      </v-toolbar>
  </template>


  <template v-slot:[`item.actions`]="{item}">
    <v-icon @click="eliminar_mesero(item)" small>
      fas fa-trash
    </v-icon>
  </template>
</v-data-table>

<v-dialog v-model='nl_dialog' max-width="500px">
    <v-card>
      <v-card-title>
        Nuevo Mesero
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols='6'>
              <v-text-field v-model="nuevo_mesero.mr_nombre" label ='Nombre'>
              </v-text-field> 
            </v-col>
            <v-col cols='6'>
              <v-text-field v-model="nuevo_mesero.mr_apellido_pat" label ='Apellido Paterno'>
              </v-text-field>
            </v-col>
            <v-col cols='6'>
              <v-text-field v-model="nuevo_mesero.mr_telefono" label ='Telefono'>
              </v-text-field>
            </v-col>
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
    name: 'Meseros',

     data () {
      return {
        headers: [
          {
            text: 'Identificador',
            align: 'start',
            sortable: false,
            value: 'mr_id',
          },
          { text: 'Nombre', value: 'mr_nombre' },
          { text: 'Apellido Paterno', value: 'mr_apellido_pat' },
          { text: 'Telefono', value: 'mr_telefono' },
          { text: 'Acciones', value: 'actions'}
        ],
        meseros: [

        ],

        nl_dialog: false,

        nuevo_mesero: {
          mr_nombre: '',
          mr_apellido_pat: '',
          mr_telefono: '',

        },

        }
          
    },

    created(){
        this.llenar_meseros();
      },

    methods: {

      async llenar_meseros(){
        const api_data = await this.axios.get('/meseros/todos_los_meseros/');
        this.meseros = api_data.data;

      },

      async eliminar_mesero(item){
        const body = {
          mr_id: item.mr_id
        };
      await this.axios.post('/meseros/eliminar_mesero/', body);
      
      this.llenar_meseros();

      },

      cancelar(){
        this.nuevo_mesero = {};
        this.nl_dialog = false;
      },

      async guardar(){
        await this.axios.post('/meseros/nuevo_mesero/', this.nuevo_mesero);
        this.llenar_meseros();
        this.cancelar();

      },


      
    },

    components: {
  
    },
  }
</script>

