   <template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <CuesComponent />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <GraphicalComponent />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <TabulatedComponent />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import CuesComponent from '../components/CuesComponent.vue';
import GraphicalComponent from '../components/GraphicalComponent.vue';
import TabulatedComponent from '../components/TabulatedComponent.vue';

</script>