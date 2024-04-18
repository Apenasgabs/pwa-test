import { Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { MyFieldsProps } from "./Form.types";
import { submitMyForm } from "./services/FormService";
import { ChangeEvent, useState } from "react";
import { StyledVideoContainer } from "./Form.styles";

const MyForm = () => {
	const [form] = Form.useForm<MyFieldsProps>();
	const [selectedFile, setSelectedFile] = useState<File | null>(null);
	const [videoUrl, setVideoUrl] = useState<string | undefined>(undefined);
	const onFinish = (values: MyFieldsProps) => {
		console.log("values: ", values);
		const formData = new FormData();
		// formData.append('fileType', 'image/png');
		formData.append("fileType", "video/mp4");
		if (selectedFile) {
			console.log("selectedFile: ", selectedFile);
			formData.append("File", selectedFile);
		}
		formData.append("IdInvitationsMedia", "1");
		formData.append("title", "	Depoimento");
		formData.append("testimony", "um depoimento legal aqui ");
		formData.append("name", "meu nome");
		formData.append("activeMedia", " 	1");
		formData.append("occupation", "ocupado");
		console.log("values: ", formData);

		submitMyForm(formData);
	};
	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};
	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event?.target?.files && event.target.files.length > 0) {
			const file = event.target.files[0];
			setSelectedFile(file); // Atualiza o estado com o arquivo selecionado
			const blob = new Blob([file], { type: file.type });
			console.log("blob: ", blob);
			const blobUrl = URL.createObjectURL(blob);
			console.log("blobUrl: ", blobUrl);
			setVideoUrl(blobUrl);
		} else {
			setSelectedFile(null); // Nenhum arquivo selecionado, então definimos como null
		}
		if (selectedFile) {
			const blob = new Blob([selectedFile], { type: selectedFile.type });
			console.log("blob: ", blob);
			const blobUrl = URL.createObjectURL(blob);
			console.log("blobUrl: ", blobUrl);
			setVideoUrl(blobUrl);
		}
	};
	return (
		<>
			{selectedFile && (
				<StyledVideoContainer>
					<video src={videoUrl} autoPlay controls>
						<track kind="captions" />
					</video>
				</StyledVideoContainer>
			)}
			<Form
				form={form}
				name="MyForm"
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete="on"
			>
				<Form.Item<MyFieldsProps> label="title" name="title">
					<TextArea autoSize />
				</Form.Item>

				<Form.Item<MyFieldsProps> label="testimony" name="testimony">
					<TextArea showCount rows={4} maxLength={200} />
				</Form.Item>

				<Form.Item<MyFieldsProps> name="name" label="name">
					<TextArea autoSize />
				</Form.Item>

				<Form.Item<MyFieldsProps> name="occupation" label="occupation">
					<TextArea autoSize />
				</Form.Item>
				<Input
					onChange={handleFileChange}
					type="file"
					name="file"
					// accept="video/*"
					// accept="image/*"
				/>
				<Form.Item<MyFieldsProps>>
					<Button htmlType="submit" type="primary">
						Send
					</Button>
				</Form.Item>
			</Form>
		</>
	);
};
export default MyForm;
