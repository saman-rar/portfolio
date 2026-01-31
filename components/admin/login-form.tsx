export function LoginForm() {
  return (
    <div className='space-y-8 md:space-y-10 pb-10'>
      <div>
        <h2 className='text-2xl md:text-3xl font-bold text-foreground mb-4'>
          Login
        </h2>
        <div className='w-19 h-1 bg-accent rounded-full mb-6' />
        <div className='space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed'>
          Login to dahboard for editing, removing or adding new projects.
        </div>
      </div>
      <div className='mx-auto flex justify-center gap-3 md:gap-4 p-4 md:p-10 bg-secondary rounded-xl md:rounded-2xl border border-border hover:border-accent transition-colors w-150'>
        <form action='' className='flex flex-col gap-10'>
          <div className='flex flex-col w-100 gap-2'>
            <label htmlFor='usename'>Usename</label>
            <input
              type='text'
              id='usename'
              name='username'
              className='h-10 bg-black/8 dark:bg-white/5 rounded-md'
            />
          </div>
          <div className='flex flex-col w-100 gap-2'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              className='h-10 bg-black/8 dark:bg-white/5 rounded-md'
            />
          </div>

          <button className='bg-blue-600 py-2 rounded-lg text-white dark:text-black text-lg cursor-pointer hover:opacity-85'>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
