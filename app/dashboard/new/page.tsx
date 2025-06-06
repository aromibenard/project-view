import { SubmitButton } from '@/components/submit-button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createProject } from '@/lib/actions/createProject';
import { auth } from '@clerk/nextjs/server';
import Form from 'next/form';

export default async function Page() {
    const { userId } =  await auth()
    
    if (!userId) {
        return (
            <div className="font-[family-name:var(--font-geist-sans)] py-16 px-3">
                <p>Please sign in to create a project.</p>
            </div>
        );
    }

    return (
        <div className="py-14 px-3">
            <div className='my-6'>
                <Form action={createProject} className='p-4 flex flex-col gap-4'>
                    <Label className='text-sm font-semibold'>Project Name</Label>
                    <Input
                        type="text"
                        name="projectName"
                        placeholder="Enter project name"
                        className='border p-2 rounded'
                        required
                    />
                    <Label className='text-sm font-semibold'>Description</Label>
                    <Textarea
                        name="description"
                        placeholder="Enter project description"
                        className='border p-2 rounded'
                        required
                    />
                    <input type='hidden' name='userId' value={userId} />
                    <SubmitButton 
                        actionText='Creating...' 
                        text='Create Project'
                        className=''
                    />
                </Form>
            </div>
        </div>
    )
}