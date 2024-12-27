'use client';

interface CameraViewProps {
    cameraUrl: string;
}

export function CameraView({ cameraUrl }: CameraViewProps) {
    return (
        <img
            id="bg"
            className="rounded-xl border border-slate-600"
            style={{
                width : '100%'
            }}
            src={`${cameraUrl}/camera`}
        ></img>
    );
}
