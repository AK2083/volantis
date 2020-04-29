<template>
    <v-dialog
        v-model="dialog"
        width="500"
    >
        <template v-slot:activator="{ on }">
            <v-btn dark v-on="on" icon>
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
        </template>

        <v-card>
            <v-toolbar flat color="primary" dark>
                <v-toolbar-title>Sequenz bearbeiten</v-toolbar-title>
            </v-toolbar>

            <v-tabs vertical>
            <v-tab>
                <v-icon left>mdi-hand</v-icon>
                Manuell
            </v-tab>
            <v-tab>
                <v-icon left>mdi-harddisk</v-icon>
                Lokal
            </v-tab>
            <v-tab>
                <v-icon left>mdi-cloud</v-icon>
                Cloud
            </v-tab>
            <v-tab>
                <v-icon left>mdi-database</v-icon>
                Institut
            </v-tab>

            <v-tab-item>
                <v-card flat>
                <v-card-text>
                    <p>
                    abc
                    </p>

                    <p>
                    der</p>

                    <p class="mb-0">
                    das
                    </p>
                </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                <v-card-text>
                    <p>
                    abc
                    </p>

                    <p>
                    der</p>

                    <p class="mb-0">
                    das
                    </p>
                </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                <v-card-text>
                    <p>
                    abc
                    </p>

                    <p>
                    der</p>

                    <p class="mb-0">
                    das
                    </p>
                </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card flat>
                <v-card-text>
                    <p>
                    abc
                    </p>

                    <p>
                    der</p>

                    <p class="mb-0">
                    das
                    </p>
                </v-card-text>
                </v-card>
            </v-tab-item>
            </v-tabs>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
  name: 'SequenceEdit',
  data: () => ({
    dialog: false,
    tab: null,
    vertical: true,
  }),
};
</script>
