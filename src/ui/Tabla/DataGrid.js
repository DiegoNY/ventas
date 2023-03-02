import { DataGrid, esES } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { CustomToolbar } from './CustomToolbar';


const TablaDataGrid = React.memo(({ columns, data, loading, pageSize, visibility }) => {
    const [load] = useState(loading)
    return (
        <DataGrid

            components={{
                Toolbar: CustomToolbar,
            }}
            getRowId={(row) => row._id || ""}
            rows={data || []}
            density='compact'
            columns={columns || []}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            initialState={
                visibility ||
                {
                    columns: {
                        columnVisibilityModel: {
                            _id: false
                        }
                    },

                }
            }
            loading={load}
            pagination
            pageSize={pageSize || 16}
        />
    )
})

export { TablaDataGrid }