<template>
<v-container>
  <v-data-table
    :headers="headers"
    :items="mesas"
    :items-per-page="5"
 
  >
  <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-tittle>Mesas</v-toolbar-tittle>
        <v-spacer></v-spacer>
        <v-btn color='success' @click="nl_dialog = true">Nueva Mesa</v-btn>
      </v-toolbar>
  </template>


  <template v-slot:[`item.actions`]="{item}">
    <v-icon @click="eliminar_mesa(item)" small>
      fas fa-trash
    </v-icon>
  </template>
</v-data-table>

<v-dialog v-model='nl_dialog' max-width="500px">
    <v-card>
      <v-card-title>
        Nueva Mesa
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols='6'>
              <v-text-field v-model="nueva_mesa.ms_asientos" label ='No. Asientos'>
              </v-text-field> 
            </v-col>
            <v-col cols='6'>
              <v-text-field v-model="nueva_mesa.ms_area" label ='Area'>
              </v-text-field>
            </v-col>
            <v-col cols='6'>
              <v-text-field v-model="nueva_mesa.ms_mr_id" label ='Mesero'>
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
    name: 'Mesas',

     data () {
      return {
        headers: [
          {
            text: 'Identificador',
            align: 'start',
            sortable: false,
            value: 'ms_id',
          },
          { text: 'No. Asientos', value: 'ms_asientos' },
          { text: 'Area', value: 'ms_area' },
          { text: 'Mesero', value: 'ms_mr_id' },
          { text: 'Acciones', value: 'actions'}
        ],
        meseros: [

        ],

        nl_dialog: false,

        nuevo_mesa: {
          ms_asientos: '',
          ms_area: '',
          ms_mr_id: '',

        },

        }
          
    },

    created(){
        this.llenar_mesas();
      },

    methods: {

      async llenar_mesas(){
        const api_data = await this.axios.get('/mesas/todas_las_mesas/');
        this.mesas = api_data.data;

      },

      async eliminar_mesa(item){
        const body = {
          ms_id: item.ms_id
        };
      await this.axios.post('/mesas/eliminar_mesa/', body);
      
      this.llenar_mesas();

      },

      cancelar(){
        this.nueva_mesa = {};
        this.nl_dialog = false;
      },

      async guardar(){
        await this.axios.post('/mesas/nueva_mesa/', this.nueva_mesa);
        this.llenar_mesas();
        this.cancelar();

      },


      
    },

    components: {
  
    },
  }
</script>

