import React, { useMemo } from 'react';

const TablaTalwindCss = React.memo((props) => {

    return (
        <>
            <div
                className={`
                    mx-1
                    relative rounded-xl overflow-auto
                    shadow-sm overflow-hidden ${props.marginY || 'my-8'} 
                `}
            >

                <div
                    className='relative rounded-xl overflow-auto'
                >
                    <div
                        className='shadow-sm  my-8 '
                    >
                        <div className="table w-full border-collapse table-auto  text-sm">
                            <div className="table-header-group ">
                                <div className="table-row ">
                                    {props?.headers?.map(header => {

                                        return (<div
                                            className="
                                                table-cell 
                                                text-center 
                                                border-b 
                                                text-xs 
                                                p-2 
                                                pt-0  
                                                text-slate-400  
                                            "
                                        >
                                            {header.name}
                                        </div>
                                        )

                                    })}
                                </div>
                            </div>
                            <div className="table-row-group">

                                {props.children}


                            </div>
                        </div>
                    </div>

                </div>

            </div>

        </>
    )
}
)

export { TablaTalwindCss }