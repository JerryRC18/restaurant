<template>
    <v-container>
        <v-data-table
                :headers="headers"
                :items="ordenes"
                :items-per-page="5"
            
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-tittle>Ordenes</v-toolbar-tittle>
                    <v-spacer></v-spacer>
                    <v-btn color='success' @click="nl_dialog = true">Nueva Orden</v-btn>
                </v-toolbar>
            </template>


            <template v-slot:[`item.actions`]="{item}">
                <v-icon @click="eliminar_orden(item)" small class="mr-3">
                fas fa-trash
                </v-icon>
                 <v-icon @click="agregar_orden(item)" small class="mr-3">
                fas fa-pencil-alt
                </v-icon>
                <v-icon @click="detalles_orden(item)" small>
                fas fa-eye
                </v-icon>
            </template>
        </v-data-table>
        <v-dialog v-model='nl_dialog' max-width="500px">
            <v-card>
                <v-card-title>Nueva Orden</v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-select
                                    :items="meseros"
                                    v-model="nueva_orden.ord_mr_id"
                                    label="Mesero"
                                >
                                </v-select>
                            </v-col>
                            <v-col cols="12">
                                <v-select
                                    :items="mesas"
                                    v-model="nueva_orden.ord_ms_id"
                                    label="Mesa"
                                >
                                </v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="6">
                                    <v-menu
                                        v-model="menu1"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="auto"
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                                v-model="nueva_orden.ord_fecha"
                                                label="Fecha de Orden"
                                                prepend-icon="far fa-calendar"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker
                                            v-model="nueva_orden.ord_fecha"
                                            @input="menu1 = false"
                                        ></v-date-picker>
                                    </v-menu>
                            </v-col>
                        <v-col cols='6'>
                            <v-text-field v-model="nueva_orden.ord_total" label ='Total'>
                            </v-text-field>
                        </v-col>
                        </v-row>
                            
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color='success' @click="guardar()">Guardar</v-btn>
                    <v-btn color='error' @click="cancelar()">Cancelar</v-btn>
                    <v-spacer></v-spacer>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model='np_dialog' max-width="500px">
            <v-card>
                <v-card-title>
                    Agregar Comida
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="agregar_renglon()">Agregar Comida</v-btn>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row v-for="(comida, index) in detalles_orden" v-bind:key="index">
                            <v-col cols="12">
                                <v-select
                                    :items="comidas"
                                    label="Titulo de la comida"
                                    v-model="comida.deto_com_id"
                                >
                                </v-select>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="success" @click="guardar_libros()">Guardar</v-btn>
                    <v-btn color="error" @click="cancelar()">Cancelar</v-btn>
                </v-card-actions>
            
            </v-card>
        </v-dialog>
        <v-dialog v-model='p_dialog' max-width="500px">
            <v-card>
                <v-card-title>
                    Comidas Servidas
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row v-for="(comida, index) in comidas_servidas" v-bind:key="index">
                            <v-col cols="12">
                                <v-text-field
                                    label="Nombre de la comida"
                                    v-model="comida.com_producto"
                                    disabled
                                >   
                                </v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text> 
                <v-card-actions>
                    <v-spacer></v-spacer>
                        <v-btn color="primary" @click="p_dialog = false"> Cerrar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>


    </v-container>

</template>

<script>
export default {
    name: "Ordenes",

    data() {
        return{
            headers: [
                {
                    text: 'Identificador',
                    align: 'start',
                    sortable: false,
                    value: 'ord_id',
                },
                { text: 'Mesero', value: 'ord_mr_id' },
                { text: 'Mesa', value: 'ord_ms_id' },
                { text: 'Fecha de Orden', value: 'ord_fecha' },
                { text: 'Total', value: 'ord_total'},
                { text: 'Acciones', value: 'actions'}
                ],

                ordenes: [],
                meseros: [],
                mesas: [],
                comidas: [],
                detalles_orden: [],
                comidas_servidas: [],
                deto_ord_id: '',
                

                nl_dialog: false,
                np_dialog: false,
                p_dialog: false,

                menu1: false,
                menu2: false,
                menu3: false,

                nueva_orden: {
                    ord_fecha: '',
                    ord_mr_id: '',
                    ord_ms_id: '',
                    ord_total: '',
                },

        }
    },

    created() {
        this.llenar_ordenes();
        this.llenar_meseros();
        this.llenar_comidas();
        this.llenar_mesas();
    },

    methods: {
        async llenar_ordenes(){
            const api_data = await this.axios.get('/ordenes/todas_las_ordenes/');
            this.ordenes = api_data.data;
        },

        async llenar_mesas(){
            const api_data = await this.axios.get('/meseros/todas_las_mesas/');
            api_data.data.forEach((item) => {
                this.mesas.push ({
                    text: item.ms_id + ' ' + item.ms_asientos + ' ' + item.ms_area,
                    value: item.ms_id

                });
            });
        },

        async llenar_meseros(){
            const api_data = await this.axios.get('/meseros/todos_los_meseros/');
            api_data.data.forEach((item) => {
                this.meseros.push ({
                    text: item.mr_nombre + ' ' + item.mr_apellido_pat,
                    value: item.mr_id

                });
            });
        },

        async llenar_comidas(){
            const api_data = await this.axios.get('/comidas/todas_las_comidas/');
            api_data.data.forEach((item) => {
                this.comidas.push ({
                    text: item.com_producto,
                    value: item.com_id

                });
            });
        },




        async eliminar_orden(item){
        const body = {
          ord_id: item.ord_id
        };
        await this.axios.post('/ordenes/eliminar_orden/', body);
        this.llenar_ordenes();

      },

      cancelar(){
        this.nueva_orden = {};
        this.detalles_orden = [];
        this.nl_dialog = false;
        this.np_dialog = false;
      },

      async guardar(){
        await this.axios.post('/ordenes/nueva_orden/', this.nueva_orden);
        this.llenar_ordenes();
        this.cancelar();

      },

      async guardar_comidas(){
          const body = {
              deto_ord_id: this.deto_ord_id,
              deto_com_id: ''

          }

            this.detalles_orden.forEach(async (comida)=> {
            body.deto_com_id = comida.deto_com_id;
            await this.axios.post('/ordenes/nuevo_det_orden/', body);
            });
        this.cancelar();

      },

      agregar_comidas(item){
          this.deto_ord_id = item.ord_id;
          this.np_dialog = true;

      },

      agregar_renglon(){
          this.det_orden.push({
              deto_com_id: '',

          });

      },

      async detalles_orden(item){
          this.p_dialog = true;
          const api_data = await this.axios.get('ordenes/leer_det_orden/' + item.ord_id.toString());
          this.comidas_servidas = api_data.data; 
      },


    },


}
    
</script>


